import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';

export const MAX_VISIBLE = 3; // 한번에 보일 최대 토스트 수
export const DEFAULT_DURATION = 2000; // 자동 닫힘 시간(ms)
export const ANIMATION_DURATION = 400; // 입/퇴장 애니메이션 시간(ms)

export type ShowToastArguments = {
  title?: string;
  contents: ReactNode;
  key?: string; // 같은 key면 기존 토스트 갱신 + 타이머 리셋
  duration?: number; // 자동 닫힘 시간
};

export type ToastItem = Required<Pick<ShowToastArguments, 'title' | 'contents'>> & {
  id: string; // 전역 고유 id (randomUUID 기반)
  key?: string;
  duration: number;
  closing?: boolean; // 내려가는 애니메이션 중인지
};

type ToastCtx = {
  visible: ToastItem[]; // 현재 화면에 있는 토스트들
  showToast: (args: ShowToastArguments) => void;
  dismissToast: (id: string) => void;
};

const ToastContext = createContext<ToastCtx | null>(null);

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast는 <ToastProvider> 내에서 사용되어야 합니다.');
  return ctx;
};

// 전역 고유 id 생성기
const nextToastId = (): string => {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }
  return `t_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
};

// 각 토스트별 타이머(닫힘 트리거/제거 타이머)를 관리
type Timers = { closeTimer?: number; removeTimer?: number };

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [visible, setVisible] = useState<ToastItem[]>([]);
  const [, setQueue] = useState<ToastItem[]>([]); // 후순위 대기열(읽지 않아도 됨)
  const timersRef = useRef<Map<string, Timers>>(new Map());

  const clearTimers = useCallback((id: string) => {
    const t = timersRef.current.get(id);
    if (!t) return;
    if (t.closeTimer) clearTimeout(t.closeTimer);
    if (t.removeTimer) clearTimeout(t.removeTimer);
    timersRef.current.delete(id);
  }, []);

  // duration 이후 closing=true, 이후 ANIMATION_DURATION 지나면 실제 제거 + 큐 승격
  const startTimers = useCallback(
    (toast: ToastItem) => {
      clearTimers(toast.id);

      const closeTimer = window.setTimeout(() => {
        // 내려가는 애니메이션 시작
        setVisible((prev) => prev.map((t) => (t.id === toast.id ? { ...t, closing: true } : t)));

        const removeTimer = window.setTimeout(() => {
          // 화면에서 제거
          setVisible((prev) => prev.filter((t) => t.id !== toast.id));
          timersRef.current.delete(toast.id);

          // 큐 승격
          setQueue((q) => {
            if (q.length === 0) return q;
            const [next, ...rest] = q;
            setVisible((prev) => {
              // 이미 들어있으면 중복 추가 방지
              if (prev.some((p) => p.id === next.id)) return prev;
              startTimers(next);
              return [...prev, next];
            });
            return rest;
          });
        }, ANIMATION_DURATION);

        const prev = timersRef.current.get(toast.id) ?? {};
        timersRef.current.set(toast.id, { ...prev, removeTimer });
      }, toast.duration);

      const prev = timersRef.current.get(toast.id) ?? {};
      timersRef.current.set(toast.id, { ...prev, closeTimer });
    },
    [clearTimers]
  );

  const dismissToast = useCallback(
    (id: string) => {
      // 즉시 closing -> ANIMATION_DURATION 뒤 제거
      clearTimers(id);

      // 이미 closing이면 중복 처리 방지
      setVisible((prev) => {
        const target = prev.find((t) => t.id === id);
        if (!target) return prev;
        if (target.closing) return prev;
        return prev.map((t) => (t.id === id ? { ...t, closing: true } : t));
      });

      const removeTimer = window.setTimeout(() => {
        setVisible((prev) => prev.filter((t) => t.id !== id));
        timersRef.current.delete(id);

        // 큐 승격
        setQueue((q) => {
          if (q.length === 0) return q;
          const [next, ...rest] = q;
          setVisible((prev) => {
            if (prev.some((p) => p.id === next.id)) return prev;
            if (prev.length >= MAX_VISIBLE) return prev;
            startTimers(next);
            return [...prev, next];
          });
          return rest;
        });
      }, ANIMATION_DURATION);

      const prev = timersRef.current.get(id) ?? {};
      timersRef.current.set(id, { ...prev, removeTimer });
    },
    [clearTimers, startTimers]
  );

  const showToast = useCallback(
    (args: ShowToastArguments) => {
      const item: ToastItem = {
        id: nextToastId(),
        title: args.title ?? '알림',
        contents: args.contents,
        key: args.key,
        duration: args.duration ?? DEFAULT_DURATION,
        closing: false,
      };

      // 1) key 중복합치기 (visible/queue)
      if (item.key) {
        let updated = false;

        setVisible((prev) => {
          const idx = prev.findIndex((t) => t.key === item.key);
          if (idx >= 0) {
            const old = prev[idx];
            clearTimers(old.id);
            const merged: ToastItem = {
              ...old,
              title: item.title,
              contents: item.contents,
              duration: item.duration,
              closing: false, // 재활성화
            };
            startTimers(merged);
            const clone = prev.slice();
            clone[idx] = merged;
            updated = true;
            return clone;
          }
          return prev;
        });

        if (!updated) {
          setQueue((prev) => {
            const idx = prev.findIndex((t) => t.key === item.key);
            if (idx >= 0) {
              const clone = prev.slice();
              clone[idx] = {
                ...clone[idx],
                title: item.title,
                contents: item.contents,
                duration: item.duration,
              };
              updated = true;
              return clone;
            }
            return prev;
          });
        }

        if (updated) return;
      }

      // 2) 빈 자리면 visible + 타이머 시작, 아니면 큐 쌓기
      setVisible((prev) => {
        if (prev.length < MAX_VISIBLE) {
          startTimers(item);
          return [...prev, item];
        }
        setQueue((q) => [...q, item]);
        return prev;
      });
    },
    [startTimers, clearTimers]
  );

  // 언마운트 시 모든 타이머 정리
  useEffect(() => {
    return () => {
      timersRef.current.forEach(({ closeTimer, removeTimer }) => {
        if (closeTimer) clearTimeout(closeTimer);
        if (removeTimer) clearTimeout(removeTimer);
      });
      timersRef.current.clear();
    };
  }, []);

  const ctx = useMemo(
    () => ({ visible, showToast, dismissToast }),
    [visible, showToast, dismissToast]
  );

  return <ToastContext.Provider value={ctx}>{children}</ToastContext.Provider>;
};
