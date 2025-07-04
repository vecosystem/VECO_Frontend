import vecologo from '../assets/vecologo.svg';
import googlelogo from '../assets/googlelogo.svg';
import kakaologo from '../assets/kakaologo.svg';
import '../index.css';

const OnboardingSSOLogin = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F9FAFB]">
      {/* 백호 텍스트 */}
      <h2 className="font-title-sb text-primary-blue">Veco</h2>

      {/* 백호 로고 */}
      <img src={vecologo} alt="Veco" className="w-[12.2rem] h-[11.1726rem] shrink-0 mt-[1.6rem]" />

      {/* "나의 작업실을 생성해봐요" 문구 */}
      <h1 className=" font-body-r text-black mt-[3.13rem]">나의 작업실을 생성해봐요</h1>

      {/* 소셜 로그인 버튼 영역 */}
      <div className="flex flex-col gap-[1.6rem] mt-[3.2rem]">
        {/* 구글 로그인 버튼 */}
        <button
          disabled
          className="pl-[2rem] w-[40rem] h-[6.4rem] rounded-[0.5rem] bg-gray-200 shrink-0"
        >
          <div className="w-[23.3rem] flex items-center justify-between">
            <img src={googlelogo} alt="Google" className="w-[2.4rem] h-[2.4rem]" />
            <span className="font-body-r text-gray-400">구글로 계속하기</span>
          </div>
        </button>

        {/* 카카오 로그인 버튼 */}
        <button
          disabled
          className="relative w-[40rem] h-[6.4rem] rounded-[0.5rem] bg-gray-200 shrink-0"
        >
          <img
            src={kakaologo}
            alt="Kakao"
            className="absolute left-[2rem] top-1/2 -translate-y-1/2 w-[4.2rem] h-[4.2rem]"
          />
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-body-r text-gray-400 text-center">
            카카오톡으로 계속하기
          </span>
        </button>
      </div>

      {/* 하단 이용약관 + 밑줄 */}
      <div className="flex flex-col gap-[0.1rem] mt-[3.2rem]">
        <p className="font-body-r text-gray-400 text-center">이용약관 & 데이터 처리 동의</p>
        <hr className=" bg-gray-400 h-[0.1rem] border-none shrink-0" />
      </div>
    </div>
  );
};

export default OnboardingSSOLogin;
