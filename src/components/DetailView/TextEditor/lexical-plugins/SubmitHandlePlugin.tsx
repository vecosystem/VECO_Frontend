// SubmitHandlePlugin.tsx
// - Lexical 에디터에 연결되어, 상위 컴포넌트에서 ref를 통해 '제출 시점'에 에디터 내용을 JSON 문자열로 직렬화(getJson)할 수 있도록 하는 플러그인
// - onChange 없이, 제출 버튼 클릭 순간에만 직렬화가 필요할 때 사용

import { forwardRef, useImperativeHandle } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { serializeEditor } from '../../../../utils/editorStateIO';

export type SubmitHandleRef = {
  getJson: () => string; // 상세페이지에서 '작성 완료' 버튼 눌러서 한번 제출 시 직렬화
};

const SubmitHandlePlugin = forwardRef<SubmitHandleRef>(function SubmitHandlePlugin(_, ref) {
  const [editor] = useLexicalComposerContext();

  useImperativeHandle(ref, () => ({
    getJson: () => serializeEditor(editor),
  }));

  return null;
});

export default SubmitHandlePlugin;
