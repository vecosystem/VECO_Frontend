// TopScrollSync.tsx
import { useRef } from 'react';

type Props = {
  children: (realRef: React.RefObject<HTMLDivElement | null>) => React.ReactNode;
};

export default function TopScrollSync({ children }: Props) {
  const topRef = useRef<HTMLDivElement>(null);
  const realRef = useRef<HTMLDivElement>(null);

  const syncTopToReal = () => {
    if (topRef.current && realRef.current) {
      topRef.current.scrollLeft = realRef.current.scrollLeft;
    }
  };
  const syncRealToTop = () => {
    if (topRef.current && realRef.current) {
      realRef.current.scrollLeft = topRef.current.scrollLeft;
    }
  };

  return (
    <div className="w-full">
      {/* 위쪽 가짜 스크롤바 - 숨김 처리 */}
      <div ref={topRef} className="h-0 overflow-hidden scrollbar-none" onScroll={syncRealToTop}>
        <div className="h-0" style={{ width: realRef.current?.scrollWidth ?? 0 }} />
      </div>

      {/* 실제 콘텐츠 */}
      <div
        ref={realRef}
        className="overflow-x-auto overflow-y-hidden basic-scroll"
        onScroll={syncTopToReal}
      >
        {children(realRef)}
      </div>
    </div>
  );
}
