/**
 * DetailTextEditor.tsx
 * 상세페이지 설명 작성 컴포넌트
 *
 * @todo
 * - 최대20자, 20자 넘길 경우 토스트 뜨게 해야 함
 * - lexical 프레임워크 공부하여 적용
 */

interface DetailTextEditorProps {
  isEditable: boolean; // true일 때만 상세 설명 내용 입력 가능
}

const DetailTextEditor = ({ isEditable }: DetailTextEditorProps) => {
  return (
    <textarea
      disabled={!isEditable}
      className="w-full h-[29.8rem] font-body-r placeholder-gray-400 text-gray-600 overflow-y-auto resize-none focus:outline-none pr-4 ${!isEditable ? 'cursor-not-allowed text-gray-600' : ''}"
      placeholder="상세 설명 추가"
    ></textarea>
  );
};

export default DetailTextEditor;
