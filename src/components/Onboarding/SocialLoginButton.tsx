import googlelogo from '../../assets/logos/googlelogo.png';
import kakaologo from '../../assets/logos/kakaologo.svg';

// 컴포넌트에 넘길 props 정의
interface SocialLoginButtonProps {
  provider: 'google' | 'kakao'; // 로그인 버튼 종류 (google 또는 kakao)
  disabled?: boolean; // 버튼 비활성화 여부 (기본값 false)
}

// SocialLoginButton 컴포넌트 정의
const SocialLoginButton = ({ provider, disabled = false }: SocialLoginButtonProps) => {
  // 구글 로그인 버튼 렌더링
  if (provider === 'google') {
    return (
      <button
        disabled={disabled} // 버튼 비활성화 여부
        className="pl-[2rem] w-[40rem] h-[6.2rem] rounded-[0.5rem] bg-gray-200"
      >
        {/* 내부 콘텐츠 영역: 로고 + 텍스트 */}
        <div className="w-[23.3rem] flex items-center justify-between">
          {/* 로고 배경 박스 */}
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
      disabled={disabled} // 버튼 비활성화 여부
      className="pl-[2rem] w-[40rem] h-[6.2rem] rounded-[0.5rem] bg-[#FEE500]"
    >
      {/* 내부 콘텐츠 영역: 로고 + 텍스트 */}
      <div className="w-[25.5rem] flex items-center justify-between">
        <img
          src={kakaologo} // 카카오 로고 이미지
          alt="Kakao"
          className="w-[4.2rem] h-[4.2rem]"
        />
        <span className="font-body-r text-gray-600">카카오톡으로 계속하기</span>
      </div>
    </button>
  );
};

export default SocialLoginButton;
