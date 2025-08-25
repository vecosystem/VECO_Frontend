import vecologo from '../../assets/logos/vecologo.svg';
import PageIndicator from '../../components/Onboarding/PageIndicator';
import onboardingSteps from '../../constants/onboardingSteps';
import PrimaryButton from '../../components/Onboarding/PrimaryButton';

const OnboardingFinish = () => {
  return (
    <div className="flex flex-col items-center gap-[3.2rem]">
      <PageIndicator currentStep={3} steps={onboardingSteps} />
      <div className="flex flex-col items-center gap-[11.4rem]">
        <div className="flex flex-col gap-[3.2rem]">
          <div className="flex flex-col items-center gap-[1.6rem]">
            <img src={vecologo} alt="Veco" className="w-[12.2rem] h-[11.1726rem]" />
            <h2 className="font-title-b text-primary-blue">Veco</h2>
          </div>
          <h1 className="min-w-max px-5 font-bigtitle-b text-gray-600">
            속도의 관성을 유지하여 목표를 달성하는 협업툴
          </h1>
        </div>
        <PrimaryButton text="지금 시작하기" to="/workspace/complete" />
      </div>
    </div>
  );
};

export default OnboardingFinish;
