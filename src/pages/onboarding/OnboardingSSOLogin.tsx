// src/pages/onboarding/OnboardingSSOLogin.tsx

import vecologo from '../../assets/logos/vecologo.svg';
import googlelogo from '../../assets/logos/googlelogo.png';
import kakaologo from '../../assets/logos/kakaologo.svg';

const OnboardingSSOLogin = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F9FAFB]">
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
          {/* 구글 로그인 버튼 */}
          <button disabled className="pl-[2rem] w-[40rem] h-[6.2rem] rounded-[0.5rem] bg-gray-200">
            <div className="w-[23.3rem] flex items-center justify-between">
              <div className="w-[4.2rem] h-[4.2rem] bg-gray-200 flex items-center justify-center shrink-0">
                <img
                  src={googlelogo}
                  alt="Google"
                  className="w-[1.966rem] h-[2.0553rem] shrink-0"
                />
              </div>
              <span className="font-body-r text-gray-600">구글로 계속하기</span>
            </div>
          </button>

          {/* 카카오 로그인 버튼 */}
          <button disabled className="pl-[2rem] w-[40rem] h-[6.2rem] rounded-[0.5rem] bg-[#FEE500]">
            <div className="w-[25.5rem] flex items-center justify-between">
              <img src={kakaologo} alt="Kakao" className="w-[4.2rem] h-[4.2rem]" />
              <span className="font-body-r text-gray-600">카카오톡으로 계속하기</span>
            </div>
          </button>
        </div>
        {/* 하단 이용약관 + 밑줄 */}
        <div className="flex flex-col">
          <p className="font-body-r text-gray-400">이용약관 & 데이터 처리 동의</p>
          <hr className=" bg-gray-400 h-[0.1rem] border-none shrink-0" />
        </div>
      </div>
    </div>
  );
};

export default OnboardingSSOLogin;
