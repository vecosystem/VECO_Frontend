// 상세페이지 내 작성완료 <-> 수정하기 버튼 컴포넌트
import IcCheckSm from '../../assets/icons/check-sm.svg';

const CompletionToggleButton = () => {
  return (
    <div className="flex items-end justify-end mb-[1.6rem]">
      {/* 컴포넌트로 만들기. 최초 생성일 때, 그리고 수정-작성완료 토글되게. */}
      {/* 제목이 필수입력 되어야 활성화되게 */}
      <div>
        <button className="flex items-center justify-center gap-[0.8rem] h-[3.6rem] py-[0.8rem] pl-[1.2rem] pr-[1.6rem] bg-gray-200 rounded-md">
          <img src={IcCheckSm} alt="확인" />
          <div className="font-small-b text-gray-400">작성 완료</div>
        </button>
      </div>
    </div>
  );
};

export default CompletionToggleButton;
