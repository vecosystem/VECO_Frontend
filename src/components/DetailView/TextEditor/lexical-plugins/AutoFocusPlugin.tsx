// AutoFocusPlugin.tsx
// Lexical 에디터가 마운트될 때 자동으로 포커스를 설정하는 Lexical 플러그인

import { type FC, useEffect } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

export const AutoFocusPlugin: FC = () => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    // 에디터가 마운트되면 자동으로 포커스를 설정
    editor.focus();
  }, [editor]);

  return null; // 특별히 DOM 요소를 렌더링할 필요가 없는 경우
};
