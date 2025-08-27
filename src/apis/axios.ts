import axios, { type InternalAxiosRequestConfig } from 'axios';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { LOCAL_STORAGE_KEY } from '../constants/key';

interface CustomInternalAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

let tokenReissuePromise: Promise<string> | null = null;

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API_URL,
  withCredentials: true,
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

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (originalRequest.url?.includes('/api/token/reissue')) {
        const { removeItem } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
        removeItem();
        window.location.href = '/onboarding';
        return Promise.reject(error);
      }

      if (!tokenReissuePromise) {
        tokenReissuePromise = axiosInstance
          .post('/api/token/reissue', null, {
            withCredentials: true,
          })
          .then((res) => {
            const newAccessToken = res.data.result?.accessToken;
            if (!newAccessToken) throw new Error('accessToken 발급 실패');

            const { setItem } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
            setItem(newAccessToken);

            return newAccessToken;
          })
          .catch((err) => {
            const { removeItem } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
            removeItem();
            window.location.href = '/onboarding';
            return Promise.reject(err);
          })
          .finally(() => {
            tokenReissuePromise = null;
          });
      }
      return tokenReissuePromise.then((newAccessToken) => {
        originalRequest.headers = originalRequest.headers || {};
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      });
    }

    return Promise.reject(error);
  }
);
