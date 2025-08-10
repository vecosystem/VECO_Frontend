// EditableTogglePlugin.tsx
// - Lexical 에디터의 편집 가능 상태를 토글하는 플러그인
// - 부모 컴포넌트에서 전달된 isEditable prop에 따라 에디터의 편집 가능 상태를 설정.

import { type FC, useEffect } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

export const EditableTogglePlugin: FC<{ isEditable: boolean }> = ({ isEditable }) => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    editor.setEditable(isEditable);
  }, [editor, isEditable]);

  return null; // 특별히 DOM 요소를 렌더링할 필요가 없는 경우
};
