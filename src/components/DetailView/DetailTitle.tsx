/**
 * DetailTitle.tsx
 * 상세페이지 제목 컴포넌트
 */

interface DetailTitleProps {
  defaultTitle: string;
  title: string;
  setTitle: (value: string) => void;
}

const DetailTitle = ({ defaultTitle, title, setTitle }: DetailTitleProps) => {
  return (
    <>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        // 각 페이지별 placeholder를 서로 다르게 할 수 있도록 defaultTitle로 처리
        placeholder={defaultTitle}
        className="w-full font-bigtitle-b placeholder-gray-400 text-gray-600 focus:outline-none"
      />
    </>
  );
};

export default DetailTitle;
