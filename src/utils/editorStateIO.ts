// lexical 에디터 <-> JSON 직렬화 & 역직렬화 유틸 모음

import { $createParagraphNode, $createTextNode, $getRoot, type LexicalEditor } from 'lexical';

// 직렬화
export const serializeEditor = (editor: LexicalEditor): string => {
  return JSON.stringify(editor.getEditorState().toJSON());
};

// 비어있지 않은 최소 유효 상태 (문단 + 빈 텍스트 1개)
const EMPTY_STATE_OBJ = {
  root: {
    children: [
      {
        type: 'paragraph',
        version: 1,
        format: '',
        indent: 0,
        direction: null,
        children: [
          {
            type: 'text',
            version: 1,
            text: '',
            detail: 0,
            format: 0,
            mode: 'normal',
            style: '',
          },
        ],
      },
    ],
    type: 'root',
    version: 1,
    format: '',
    indent: 0,
    direction: null,
  },
};

// JSON을 Lexical 에디터 상태로 불러오기 (set 전에 빈 상태 차단)
export const loadEditorStateFromJson = (editor: LexicalEditor, json?: string | object) => {
  try {
    // 1) 입력이 비었으면 바로 fallback으로
    if (!json || (typeof json === 'string' && json.trim() === '')) {
      const fb = editor.parseEditorState(EMPTY_STATE_OBJ as any);
      editor.setEditorState(fb);
      return;
    }

    // 2) 객체화
    const data = typeof json === 'string' ? JSON.parse(json) : json;

    // 3) 우선 파싱
    const parsed = editor.parseEditorState(data as any);

    // 4) 파싱된 상태가 빈지 검사 (읽기 전용)
    let isEmpty = false;
    parsed.read(() => {
      isEmpty = $getRoot().getChildrenSize() === 0;
    });

    // 5) 비면 fallback으로 교체
    const finalState = isEmpty ? editor.parseEditorState(EMPTY_STATE_OBJ as any) : parsed;

    // 6) set (항상 비지 않은 상태만 set)
    editor.setEditorState(finalState);

    // 7) et 이후에도 혹시 모를 케이스 보정
    editor.update(() => {
      const root = $getRoot();
      if (root.getChildrenSize() === 0) {
        const p = $createParagraphNode();
        p.append($createTextNode(''));
        root.append(p);
      }
    });
  } catch (e) {
    console.error('EditorState 파싱 실패, 빈 상태로 복구:', e);
    // 파싱 자체가 실패해도 fallback 상태를 set
    const fb = editor.parseEditorState(EMPTY_STATE_OBJ as any);
    editor.setEditorState(fb);
  }
};
