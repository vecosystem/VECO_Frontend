// lexical 에디터 <-> JSON 직렬화 & 역직렬화 유틸 모음
// TODO: 주석 달기

import type { LexicalEditor } from 'lexical';

// Lexical 에디터에 입력한 내용을 저장 가능한 JSON 문자열로 반환
export const serializeEditor = (editor: LexicalEditor): string => {
  return JSON.stringify(editor.getEditorState().toJSON());
};

// JSON을 Lexical 에디터 상태로 불러오기
export const loadEditorStateFromJson = (
  editor: LexicalEditor,
  json?: string | object // 문자열/객체 모두 허용
) => {
  if (!json) return; // 빈 값이면 기본 상태 유지

  try {
    const data = typeof json === 'string' ? JSON.parse(json) : json; // json이 문자열이면 JSON.parse로 객체로 변환
    const editorState = editor.parseEditorState(data as any); // Lexical이 이해할 수 있는 EditorState 객체로 변환
    editor.setEditorState(editorState); // 변환한 상태를 에디터에 렌더링
  } catch (e) {
    console.error('EditorState 파싱 실패: 빈 상태로 초기화', e);
  }
};
