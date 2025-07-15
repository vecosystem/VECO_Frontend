import googlelogo from '../../assets/logos/googlelogo.png';
import kakaologo from '../../assets/logos/kakaologo.svg';

// 컴포넌트에 넘길 props 정의
interface SocialLoginButtonProps {
  provider: 'google' | 'kakao'; // 로그인 버튼 종류 (google 또는 kakao)
}

// SocialLoginButton 컴포넌트 정의
const SocialLoginButton = ({ provider }: SocialLoginButtonProps) => {
  // 버튼 클릭 시 실행되는 함수: provider에 따라 백엔드 로그인 URL로 이동
  const handleClick = () => {
    const baseUrl = 'https://your-api.com/api/auth/login'; // 백엔드 로그인 라우트 (명세서에 따라 수정)
    const targetUrl = provider === 'google' ? `${baseUrl}/google` : `${baseUrl}/kakao`;
    window.location.href = targetUrl; // 해당 URL로 리디렉션 (현재 창에서 이동)
  };

  // 구글 로그인 버튼 렌더링
  if (provider === 'google') {
    return (
      <button
        onClick={handleClick} // 버튼 클릭 시 리디렉트
        className="pl-[2rem] w-[40rem] h-[6.2rem] rounded-[0.5rem] bg-gray-200 cursor-pointer hover:opacity-90"
      >
        {/* 내부 콘텐츠 영역: 로고 + 텍스트 */}
        <div className="w-[23.3rem] flex items-center justify-between">
          <div className="w-[4.2rem] h-[4.2rem] bg-gray-200 flex items-center justify-center shrink-0">
            <img src={googlelogo} alt="Google" className="w-[1.966rem] h-[2.0553rem] shrink-0" />
          </div>
          <span className="font-body-r text-gray-600">구글로 계속하기</span>
        </div>
      </button>
    );
  }

  // 카카오 로그인 버튼 렌더링
  return (
    <button
      onClick={handleClick}
      className="pl-[2rem] w-[40rem] h-[6.2rem] rounded-[0.5rem] bg-[#FEE500] cursor-pointer hover:opacity-90"
    >
      {/* 내부 콘텐츠 영역: 로고 + 텍스트 */}
      <div className="w-[25.5rem] flex items-center justify-between">
        <img src={kakaologo} alt="Kakao" className="w-[4.2rem] h-[4.2rem]" />
        <span className="font-body-r text-gray-600">카카오톡으로 계속하기</span>
      </div>
    </button>
  );
};

export default SocialLoginButton;
