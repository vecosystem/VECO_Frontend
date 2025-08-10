// CodeHighlightPlugin.tsx
// 코드 블록의 스타일링을 위한 플러그인

import { type FC, useEffect } from 'react';
import { registerCodeHighlighting } from '@lexical/code';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

export const CodeHighlightPlugin: FC = () => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return registerCodeHighlighting(editor); // 구문 강조를 위한 로직을 등록하기 위한 함수
  }, [editor]);

  return null;
};
