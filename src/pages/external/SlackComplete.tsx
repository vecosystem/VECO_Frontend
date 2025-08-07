import PrimaryButton from '../../components/Onboarding/PrimaryButton.tsx';
import IcSlack from '../../assets/icons/slack.svg';
import { useNavigate, useSearchParams } from 'react-router-dom';

const SlackComplete = () => {
  const [searchParams] = useSearchParams();
  const teamId = searchParams.get('teamId');
  const navigate = useNavigate();

  return (
    <div className="flex flex-col w-full h-dvh items-center justify-center bg-gray-onboard">
      <div className="h-[42rem] flex flex-col justify-end">
        <div className="flex flex-col items-center gap-[10.8rem]">
          <div className="flex flex-col items-center gap-[3.2rem] text-center">
            <img src={IcSlack} alt="Slack" className="w-60 h-60" />
            <h3 className="font-title-sub-r text-gray-600">
              Slack 연동에 성공했습니다
              <br /> 이제 팀원들과 함께 이슈를 관리해보세요!
            </h3>
          </div>
          {/* 돌아가기 버튼 */}
          <PrimaryButton
            text="돌아가기"
            onClick={() => {
              navigate(`/workspace/team/${teamId}/ext`);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default SlackComplete;
