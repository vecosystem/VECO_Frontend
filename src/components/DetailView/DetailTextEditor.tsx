/**
 * DetailTextEditor.tsx
 * 상세페이지 설명 작성 컴포넌트
 *
 * @todo
 * - lexical 프레임워크 공부하여 적용 예정
 */

interface DetailTextEditorProps {
  isEditable: boolean; // true일 때만 상세 설명 내용 입력 가능
}

const DetailTextEditor = ({ isEditable }: DetailTextEditorProps) => {
  return (
    <textarea
      disabled={!isEditable}
      className="w-full flex-1 font-body-r placeholder-gray-400 text-gray-600 overflow-y-scroll basic-scroll resize-none focus:outline-none pr-4 ${!isEditable ? 'cursor-not-allowed text-gray-600' : ''}"
      placeholder="상세 설명 추가"
    ></textarea>
  );
};

export default DetailTextEditor;
