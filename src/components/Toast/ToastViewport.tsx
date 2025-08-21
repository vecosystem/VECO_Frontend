import { createPortal } from 'react-dom';
import { ANIMATION_DURATION, useToast } from './ToastProvider';
import { useEffect, useMemo, useState } from 'react';

const ToastViewport = () => {
  const { visible } = useToast();
  const [mountedIds, setMountedIds] = useState<Set<string>>(new Set());

  // 새로 생긴 토스트 나타나는 애니메이션 트리거
  useEffect(() => {
    const current = new Set(visible.map((t) => t.id));
    const news = [...current].filter((id) => !mountedIds.has(id));
    if (news.length) {
      const r = requestAnimationFrame(() => {
        setMountedIds((prev) => new Set([...prev, ...news]));
      });
      return () => cancelAnimationFrame(r);
    }
    // 사라진 토스트 id는 정리(메모리 관리)
    const gone = [...mountedIds].filter((id) => !current.has(id));
    if (gone.length) {
      setMountedIds((prev) => {
        const next = new Set(prev);
        gone.forEach((id) => next.delete(id));
        return next;
      });
    }
  }, [visible, mountedIds]);

  const items = useMemo(() => visible, [visible]);

  return createPortal(
    <div
      className="flex flex-col gap-[1rem] fixed bottom-[5rem] right-[6.4rem] w-[36rem] z-30 pointer-events-none"
      role="status" // 상태메시지용
      aria-live="polite" // 텍스트 업데이트 시 대기 후 스크린리더가 읽음
      aria-atomic="true" // 메시지 전체를 한 번에 읽게 함
    >
      {items.map((t) => {
        const mounted = mountedIds.has(t.id);
        const leaving = !!t.closing;

        // 기본 스타일 + 트랜지션
        const base =
          'pointer-events-auto flex flex-col gap-[1.6rem] p-[2.4rem] rounded-lg border bg-gray-200 border-gray-300 text-gray-600 transform transition-all ease-in-out';
        const motionClass = leaving
          ? 'opacity-0 translate-y-3' // 토스트 사라지는 애니메이션 (아래로 사라짐)
          : mounted
            ? 'opacity-100 translate-y-0' // 토스트 나타남 완료/유지
            : 'opacity-0 translate-y-3'; // mount 직후 프레임

        return (
          <div
            key={t.id}
            className={`${base} ${motionClass}`}
            style={{ transitionDuration: `${ANIMATION_DURATION}ms` }}
            onMouseDown={(e) => e.stopPropagation()}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="font-title-sub-b">{t.title}</h2>
            <div className="font-body-r">{t.contents}</div>
          </div>
        );
      })}
    </div>,
    document.body
  );
};

export default ToastViewport;
