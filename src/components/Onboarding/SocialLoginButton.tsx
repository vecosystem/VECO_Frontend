import googlelogo from '../../assets/logos/googlelogo.png';
import kakaologo from '../../assets/logos/kakaologo.svg';
import { redirectToGoogleLogin, redirectToKakaoLogin } from '../../apis/auth';

interface SocialLoginButtonProps {
  provider: 'google' | 'kakao';
}

const SocialLoginButton = ({ provider }: SocialLoginButtonProps) => {
  const handleClick = async () => {
    try {
      if (provider === 'google') {
        redirectToGoogleLogin();
      } else {
        redirectToKakaoLogin();
      }
    } catch (error) {
      console.error('소셜 로그인 리다이렉트 실패:', error);
    }
  };

  if (provider === 'google') {
    return (
      <button
        onClick={handleClick}
        className="pl-[2rem] w-[40rem] h-[6.2rem] rounded-[0.5rem] bg-gray-200 cursor-pointer hover:opacity-90"
      >
        <div className="w-[23.3rem] flex items-center justify-between">
          <div className="w-[4.2rem] h-[4.2rem] bg-gray-200 flex items-center justify-center shrink-0">
            <img src={googlelogo} alt="Google" className="w-[1.966rem] h-[2.0553rem] shrink-0" />
          </div>
          <span className="font-body-r text-gray-600">구글로 계속하기</span>
        </div>
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      className="pl-[2rem] w-[40rem] h-[6.2rem] rounded-[0.5rem] bg-kakao-yellow cursor-pointer hover:opacity-90"
    >
      <div className="w-[25.5rem] flex items-center justify-between">
        <img src={kakaologo} alt="Kakao" className="w-[4.2rem] h-[4.2rem]" />
        <span className="font-body-r text-gray-600">카카오톡으로 계속하기</span>
      </div>
    </button>
  );
};

export default SocialLoginButton;
