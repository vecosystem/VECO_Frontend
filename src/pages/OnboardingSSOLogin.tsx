import vecologo from '../assets/vecologo.svg';
import googlelogo from '../assets/googlelogo.svg';
import kakaologo from '../assets/kakaologo.svg';
import bottomline from '../assets/bottomline.svg';

const OnboardingSSOLogin = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center font-[Poppins] bg-[#F9FAFB]">
      {/* 백호 텍스트 */}
      <h2 className="text-[24px] font-semibold leading-[36px] tracking-[-0.48px] text-[#132650] mb-[31.27px]">
        Veco
      </h2>

      {/* 백호 로고 */}
      <img src={vecologo} alt="Veco" className="w-[122px] h-[111.726px] shrink-0" />

      {/* "나의 작업실을 생성해봐요" 문구 */}
      <h1
        className="w-[400px] mt-[22.4px] text-base font-normal leading-[22.4px] tracking-[-0.32px]
               text-black text-center"
      >
        나의 작업실을 생성해봐요
      </h1>

      {/* 소셜 로그인 버튼 영역 */}
      <div className="flex flex-col gap-3 mt-[28px]">
        {/* 구글 로그인 버튼 */}
        <button
          disabled
          className="w-[400px] h-[64px] relative rounded-[5px] bg-[#F3F3F3] shrink-0"
        >
          <img
            src={googlelogo}
            alt="Google"
            className="absolute left-[16px] top-1/2 -translate-y-1/2 w-[40px] h-[30px]"
          />
          <span
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                 text-base font-normal leading-[22.4px] tracking-[-0.32px]
                 text-[#AEAEAE]"
          >
            구글로 계속하기
          </span>
        </button>

        {/* 카카오 로그인 버튼 */}
        <button
          disabled
          className="w-[400px] h-[64px] relative rounded-[5px] bg-[#F3F3F3] shrink-0"
        >
          <img
            src={kakaologo}
            alt="Kakao"
            className="absolute left-[16px] top-1/2 -translate-y-1/2 w-[42px] h-[42px]"
          />
          <span
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                 text-base font-normal leading-[22.4px] tracking-[-0.32px]
                 text-[#AEAEAE]"
          >
            카카오톡으로 계속하기
          </span>
        </button>
      </div>

      {/* 하단 이용약관 + 밑줄 */}
      <div className="mt-[40px] flex flex-col items-center justify-center">
        <p
          className="text-[#AEAEAE] text-base font-normal leading-[22.4px]
               tracking-[-0.32px]"
        >
          이용약관 & 데이터 처리 동의
        </p>
        <img src={bottomline} alt="BottomLine" className="w-[186px] h-[2px] mt-[-2px]" />
      </div>
    </div>
  );
};

export default OnboardingSSOLogin;
