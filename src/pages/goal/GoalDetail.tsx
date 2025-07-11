import DetailHeader from '../../components/DetailView/DetailHeader';

const GoalDetail = () => {
  return (
    <div className="flex flex-col gap-[5.7rem] w-full">
      {/* 헤더 컴포넌트: 글 제목에 따라 실시간으로 바뀌도록 수정 */}
      {/* 목표명: 팀명+목표번호가 반영되게 */}
      <DetailHeader />
      <div className="flex px-[3.2rem] gap-[8.8rem] w-full">
        {/* 글 작성란 */}
        <div className="flex flex-col gap-[3.2rem] w-[calc(100%-33rem)]">
          <input
            type="text"
            placeholder="목표를 생성하세요"
            className="w-full font-bigtitle-b placeholder-gray-400 text-gray-600 focus:outline-none"
          />
          {/* 상세 설명 컴포넌트: 추후 텍스트 에디터 반영. */}
          <textarea
            className="w-full h-[29.8rem] font-body-r placeholder-gray-400 text-gray-600 overflow-y-auto resize-none focus:outline-none pr-4"
            placeholder="상세 설명 추가"
          ></textarea>

          {/* 댓글 구역 컴포넌트: 초기 작성 완료 후에 나타남. */}
          <div>
            <div>댓글 제목</div>
            {/* 댓글 컴포넌트: 작성한 댓글 내용이 여기에 나타남 */}
            <div>댓글 목록</div>
            <div>댓글 작성 input + 입력 완료 창</div>
          </div>
        </div>

        <div className="w-[33rem]">
          {/* 속성 */}
          <div className="">속성</div>
          <div>
            {/* 개별 속성 항목 */}
            {/* 컴포넌트 만들어놓고 쓰기. 아이콘 + 텍스트 형태 */}
            {/* 각 속성 항목 누르면 그 위에 드롭다운 나타남. */}
            {/* 드롭다운에서 선택한 걸 받아서 띄우도록. */}
            {/* 가을이가 작성한 코드 적용법 보고 적용할 것. */}
            <div>개별 속성 항목</div>
            <div>개별 속성 항목</div>
            <div>개별 속성 항목</div>
            <div>개별 속성 항목</div>
            <div>개별 속성 항목</div>
            <div>개별 속성 항목</div>
          </div>

          {/* 작성 완료 버튼 */}
          {/* 컴포넌트로 만들기. 최초 생성일 때, 그리고 수정-작성완료 토글되게. */}
          {/* 제목, 설명 모두 필수입력 되어야 활성화되게 */}
          <div>버튼</div>
        </div>
      </div>
    </div>
  );
};

export default GoalDetail;
