import axios, { type InternalAxiosRequestConfig } from 'axios';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { LOCAL_STORAGE_KEY } from '../constants/key';

// 커스텀 인터페이스: 재시도 여부를 위한 플래그 추가
interface CustomInternalAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

// refresh 요청 중복 방지를 위한 전역 변수
let refreshPromise: Promise<string> | null = null;

// 기본 axios 인스턴스
export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API_URL,
  withCredentials: false, // 기본적으로 쿠키 전송 X
});

/**
 * 요청 인터셉터
 * - 모든 요청에 accessToken이 있다면 Authorization 헤더에 추가
 */
axiosInstance.interceptors.request.use(
  (config) => {
    const { getItem } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
    const accessToken = getItem();

    if (accessToken) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * 응답 인터셉터
 * - accessToken 만료(401) 발생 시 → refreshToken을 사용하여 재발급 시도
 * - 재발급 성공 시 원래 요청 재전송
 */
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest: CustomInternalAxiosRequestConfig = error.config;

    // accessToken이 만료된 경우 && 아직 재시도한 적 없는 경우
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // 재발급 요청 자체가 실패한 경우 → 온보딩 처음 페이지로 이동
      if (originalRequest.url?.includes('/api/token/reissue')) {
        const { removeItem } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
        removeItem(); // accessToken 삭제
        window.location.href = '/onboarding';
        return Promise.reject(error);
      }

      // 이미 진행 중인 refresh 요청이 없으면 실행
      if (!refreshPromise) {
        refreshPromise = axiosInstance
          .post('/api/token/reissue', null, {
            withCredentials: true, // 쿠키 포함 (refreshToken)
          })
          .then((res) => {
            const newAccessToken = res.data.result?.accessToken;
            if (!newAccessToken) throw new Error('accessToken 발급 실패');

            const { setItem } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
            setItem(newAccessToken); // 새로운 accessToken 저장

            return newAccessToken;
          })
          .catch((err) => {
            const { removeItem } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
            removeItem(); // 실패 시 accessToken 삭제
            window.location.href = '/onboarding';
            return Promise.reject(err);
          })
          .finally(() => {
            // 다음 요청에서 재시도 가능하도록 초기화
            refreshPromise = null;
          });
      }

      // 재발급 성공 시 -> 기존 요청에 새 accessToken 붙여서 재전송
      return refreshPromise.then((newAccessToken) => {
        originalRequest.headers = originalRequest.headers || {};
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      });
    }

    return Promise.reject(error);
  }
);
