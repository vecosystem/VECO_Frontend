import { useNavigate } from 'react-router-dom';
import PrimaryButton from '../components/Onboarding/PrimaryButton.tsx';
import type { FallbackProps } from 'react-error-boundary';
import type { AxiosError } from 'axios';

const ServerError = ({ error, resetErrorBoundary }: FallbackProps) => {
  const navigate = useNavigate();

  // AxiosError인지 확인
  const isAxiosError = (err: unknown): err is AxiosError => {
    return (err as AxiosError)?.isAxiosError === true;
  };

  // 상태 코드 추출
  const statusCode = isAxiosError(error) ? error.response?.status : null;

  const getErrorMessage = () => {
    switch (statusCode) {
      case 400:
        return '잘못된 요청입니다.';
      case 401:
        return '인증되지 않은 사용자입니다.';
      case 403:
        return '접근이 거부되었습니다.';
      case 404:
        return '요청한 리소스를 찾을 수 없습니다.';
      case 500:
        return '서버 오류가 발생했습니다.';
      default:
        return '알 수 없는 오류가 발생했습니다.';
    }
  };

  return (
    <div className="flex flex-col w-full h-dvh items-center justify-center bg-gray-onboard">
      <div className="h-[42rem] flex flex-col justify-end">
        <div className="flex flex-col items-center gap-[10.8rem]">
          {/* 에러 문구 */}
          <div className="flex flex-col gap-[3.2rem] text-center">
            <h2 className="font-bigtitle-b text-gray-600">
              {statusCode ? `${statusCode} Error` : 'Error'}
            </h2>
            <h3 className="font-title-sub-r text-gray-600">
              {getErrorMessage()}
              <br /> 잠시 후 다시 시도해 주세요!
            </h3>
          </div>
          {/* 돌아가기 버튼 */}
          <PrimaryButton
            text="돌아가기"
            onClick={() => {
              resetErrorBoundary();
              // 뒤로 가기 및 새로고침
              navigate(-1);
              window.location.reload();
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ServerError;
