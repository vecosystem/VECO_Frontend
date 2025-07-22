// src/pages/onboarding/OnboardingSSOLogin.tsx

import vecologo from '../../assets/logos/vecologo.svg';
import SocialLoginButton from '../../components/Onboarding/SocialLoginButton';

const OnboardingSSOLogin = () => {
  // useOnboardingGuard(0); API 연결 후 훅 사용 예정
  return (
    <div className="flex flex-col items-center gap-[3.2rem]">
      {/* 백호 로고 & 백호 텍스트*/}
      <div className="flex flex-col items-center gap-[1.6rem]">
        <img src={vecologo} alt="Veco" className="w-[12.2rem] h-[11.1726rem]" />
        <h2 className="font-title-b text-primary-blue">Veco</h2>
      </div>
      {/* "나의 작업실을 생성해봐요" 문구 */}
      <h1 className="font-body-r text-gray-600">나의 작업실을 생성해봐요</h1>
      {/* 소셜 로그인 버튼 영역 */}
      <div className="flex flex-col items-center gap-[1.6rem]">
        <SocialLoginButton provider="google" />
        <SocialLoginButton provider="kakao" />
      </div>
      {/* 하단 이용약관 + 밑줄 */}
      <div className="flex flex-col">
        <p className="font-body-r text-gray-400">이용약관 & 데이터 처리 동의</p>
        <hr className=" bg-gray-400 h-[0.1rem] border-none shrink-0" />
      </div>
    </div>
  );
};

export default OnboardingSSOLogin;
