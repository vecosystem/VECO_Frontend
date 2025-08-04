import { useNavigate } from 'react-router-dom';
import PrimaryButton from '../components/Onboarding/PrimaryButton.tsx';

const Server500Error = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col w-full h-dvh items-center justify-center bg-gray-onboard">
      <div className="h-[42rem] flex flex-col justify-end">
        <div className="flex flex-col items-center gap-[10.8rem]">
          {/* 에러 문구 */}
          <div className="flex flex-col gap-[3.2rem] text-center">
            <h2 className="font-bigtitle-b text-gray-600">500</h2>
            <h3 className="font-title-sub-r text-gray-600">
              서버 오류가 발생했습니다.
              <br /> 잠시 후 다시 시도해 주세요!
            </h3>
          </div>
          {/* 돌아가기 버튼 */}
          <PrimaryButton
            text="돌아가기"
            onClick={() => {
              navigate(-1);
              window.location.reload();
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Server500Error;
