// SubmitHandlePlugin.tsx
// - Lexical 에디터에 연결되어, 상위 컴포넌트에서 ref를 통해 '제출 시점'에 에디터 내용을 JSON 문자열로 직렬화(getJson)할 수 있도록 하는 플러그인
// - onChange 없이, 제출 버튼 클릭 순간에만 직렬화가 필요할 때 사용

import { forwardRef, useImperativeHandle } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { serializeEditor } from '../../../../utils/editorStateIO';
import type { EditorState } from 'lexical';

export const EMPTY_EDITOR_STATE = JSON.stringify({
  root: {
    children: [
      {
        children: [],
        direction: null,
        format: '',
        indent: 0,
        type: 'paragraph',
        version: 1,
      },
    ],
    direction: null,
    format: '',
    indent: 0,
    type: 'root',
    version: 1,
  },
});

function ensureNonEmpty(json: string): string {
  try {
    const obj = JSON.parse(json);
    const root = obj?.root;
    const children = root?.children;
    // 루트가 없거나 children이 배열이 아니거나 빈 배열이면 기본값으로
    if (!root || !Array.isArray(children) || children.length === 0) {
      return EMPTY_EDITOR_STATE;
    }
    return json;
  } catch {
    return EMPTY_EDITOR_STATE; // 파싱 실패 시에도 안전하게 기본값
  }
}

export type SubmitHandleRef = {
  getJson: () => string; // 상세페이지에서 '작성 완료' 버튼 눌러서 한번 제출 시 직렬화
  loadJson: (json: string) => void; // 역직렬화
};

const SubmitHandlePlugin = forwardRef<SubmitHandleRef>(function SubmitHandlePlugin(_, ref) {
  const [editor] = useLexicalComposerContext();

  useImperativeHandle(ref, () => ({
    getJson: () => {
      const raw = serializeEditor(editor);
      return ensureNonEmpty(raw);
    },

    // 역직렬화
    loadJson: (json: string) => {
      // 빈 값이면 아무 것도 하지 않음 (초기 상태 유지)
      if (!json || json.trim() === '') return;

      try {
        const safe = ensureNonEmpty(json); // 로드 시에도 비어있으면 보정
        const data = JSON.parse(safe); // 문자열 -> 객체
        const editorState: EditorState = editor.parseEditorState(data); // Lexical이 이해할 수 있는 EditorState로 파싱
        editor.setEditorState(editorState); // 파싱한 상태를 에디터에 반영
      } catch (e) {
        console.error('Lexical EditorState 역직렬화 실패: ', e);
        // 파싱 실패 시에는 안전하게 아무 것도 하지 않음(기본 상태 유지)
      }
    },
  }));

  return null;
});

export default SubmitHandlePlugin;
