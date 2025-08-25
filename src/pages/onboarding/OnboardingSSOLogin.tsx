import vecologo from '../../assets/logos/vecologo.svg';
import SocialLoginButton from '../../components/Onboarding/SocialLoginButton';

const OnboardingSSOLogin = () => {
  return (
    <div className="flex flex-col items-center gap-[3.2rem]">
      <div className="flex flex-col items-center gap-[1.6rem]">
        <img src={vecologo} alt="Veco" className="w-[12.2rem] h-[11.1726rem]" />
        <h2 className="font-title-b text-primary-blue">Veco</h2>
      </div>
      <h1 className="font-body-r text-gray-600">나의 작업실을 생성해봐요</h1>
      <div className="flex flex-col items-center gap-[1.6rem]">
        <SocialLoginButton provider="google" />
        <SocialLoginButton provider="kakao" />
      </div>
      <div
        className="flex flex-col cursor-pointer"
        onClick={() =>
          window.open(
            'https://pretty-tumbleweed-40b.notion.site/2442d37cca1180959688e0343ab6bd96',
            '_self'
          )
        }
      >
        <p className="font-body-r text-gray-400">이용약관 & 데이터 처리 동의</p>
        <hr className="bg-gray-400 h-[0.1rem] border-none shrink-0" />
      </div>
    </div>
  );
};

export default OnboardingSSOLogin;
