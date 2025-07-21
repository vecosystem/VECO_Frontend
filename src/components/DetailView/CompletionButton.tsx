/**
 * CompletionButton.tsx
 * 상세페이지 내 작성완료 <-> 수정하기 버튼 컴포넌트
 *
 * @todo
 * - 플로우대로 상태 변화하도록 적용
 *   (1) 최초 생성 후: 제목 작성 완료 전에는 비활성화 상태 '작성 완료' - 이 때는 마우스 커서 모양을 중지 모양으로
 *   (2) 제목 작성 완료 시 활성화 상태 '작성 완료'로 변경됨 - 이 때는 마우스 커서 모양을 손가락 모양으로
 *   (3) 작성 완료하여 반영 후: '수정하기' 버튼으로 변경 - 마우스 커서 : 손가락 모양
 *   (4) '수정하기' 버튼 클릭 시, 다시 '작성 완료' 버튼으로 변경 - 마우스 커서 : 손가락 모양
 *
 */
import IcCheckSm from '../../assets/icons/check-sm.svg';

const CompletionToggleButton = () => {
  return (
    <div className="flex items-end justify-end mb-[1.6rem]">
      <div>
        <button className="flex items-center justify-center gap-[0.8rem] h-[3.6rem] py-[0.8rem] pl-[1.2rem] pr-[1.6rem] bg-gray-200 rounded-md">
          <img src={IcCheckSm} alt="확인" />
          <div className="font-small-b text-gray-400 whitespace-nowrap">작성 완료</div>
        </button>
      </div>
    </div>
  );
};

export default CompletionToggleButton;
