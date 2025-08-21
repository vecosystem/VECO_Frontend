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

type ToastProviderProps = { children: ReactNode };

export const MAX_VISIBLE = 3; // 한번에 쌓아서 보여줄 수 있는 최대 토스트 개수
export const DEFAULT_DURATION = 2000; // 자동 닫힘까지 걸리는 시간(ms)

export type ShowToastArguments = {
  title?: string;
  contents: ReactNode;
  key?: string; // 같은 key면 기존 토스트 갱신 + 타이머 리셋
  duration?: number;
};

export type ToastItem = Required<Pick<ShowToastArguments, 'title' | 'contents'>> & {
  id: number;
  key?: string;
  duration: number;
};

type ToastCtx = {
  visible: ToastItem[]; // 현재 화면에 보이는 토스트들(스택)
  showToast: (args: ShowToastArguments) => void; // 토스트 띄우기
  dismissToast: (id: number) => void; // 토스트 수동 닫기
};

const ToastContext = createContext<ToastCtx | null>(null);

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast는 <ToastProvider> 내에서 사용되어야 합니다.');
  return ctx;
};

export const ToastProvider = ({ children }: ToastProviderProps) => {
  const [visible, setVisible] = useState<ToastItem[]>([]);
  const [, setQueue] = useState<ToastItem[]>([]);
  const idRef = useRef(0);
  const timersRef = useRef<Map<number, number>>(new Map());

  const startTimer = useCallback((toast: ToastItem) => {
    const timer = window.setTimeout(() => {
      // 자동 닫힘
      setVisible((prev) => prev.filter((t) => t.id !== toast.id));
      timersRef.current.delete(toast.id);

      // 빈 칸 생기면 큐에서 하나 꺼내기
      setQueue((q) => {
        if (q.length === 0) return q;
        const [next, ...rest] = q;
        setVisible((prev) => {
          const updated = [...prev, next];
          // 다음 토스트 타이머 시작
          startTimer(next);
          return updated;
        });
        return rest;
      });
    }, toast.duration);
    timersRef.current.set(toast.id, timer);
  }, []);

  const dismissToast = useCallback(
    (id: number) => {
      const timer = timersRef.current.get(id);
      if (timer) {
        clearTimeout(timer);
        timersRef.current.delete(id);
      }
      setVisible((prev) => prev.filter((t) => t.id !== id));

      // 닫히면 빈 칸 채우기
      setQueue((q) => {
        if (q.length === 0) return q;
        const [next, ...rest] = q;
        setVisible((prev) => {
          if (prev.length >= MAX_VISIBLE) return prev;
          startTimer(next);
          return [...prev, next];
        });
        return rest;
      });
    },
    [startTimer]
  );

  const showToast = useCallback(
    (args: ShowToastArguments) => {
      const item: ToastItem = {
        id: ++idRef.current,
        title: args.title ?? '알림',
        contents: args.contents,
        key: args.key,
        duration: args.duration ?? DEFAULT_DURATION,
      };

      // 1) key 중복합치기: visible/queue에서 같은 key를 찾아 갱신 + 타이머 리셋
      if (item.key) {
        let updated = false;

        setVisible((prev) => {
          const index = prev.findIndex((t) => t.key === item.key);
          if (index >= 0) {
            const old = prev[index];
            // 타이머 리셋
            const h = timersRef.current.get(old.id);
            if (h) {
              clearTimeout(h);
              timersRef.current.delete(old.id);
            }
            const merged: ToastItem = {
              ...old,
              title: item.title,
              contents: item.contents,
              duration: item.duration,
            };
            startTimer(merged);
            const clone = prev.slice();
            clone[index] = merged;
            updated = true;
            return clone;
          }
          return prev;
        });

        if (!updated) {
          setQueue((prev) => {
            const index = prev.findIndex((t) => t.key === item.key);
            if (index >= 0) {
              const clone = prev.slice();
              clone[index] = {
                ...clone[index],
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

        if (updated) return; // 이미 갱신됐으면 여기서 끝
      }

      // 2) 자리가 있으면 visible에 올리고 타이머 시작
      setVisible((prev) => {
        if (prev.length < MAX_VISIBLE) {
          startTimer(item);
          return [...prev, item];
        }
        // 3) 아니면 큐에 적재
        setQueue((q) => [...q, item]);
        return prev;
      });
    },
    [startTimer]
  );

  // 언마운트 시 모든 타이머 정리
  useEffect(() => {
    return () => {
      timersRef.current.forEach((h) => clearTimeout(h));
      timersRef.current.clear();
    };
  }, []);

  const ctx = useMemo(
    () => ({ visible, showToast, dismissToast }),
    [visible, showToast, dismissToast]
  );

  return <ToastContext.Provider value={ctx}>{children}</ToastContext.Provider>;
};
