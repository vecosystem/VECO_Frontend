// lexical 에디터 -> JSON 직렬화 / 안전 파싱 함수

import type { LexicalEditor } from 'lexical';

export const serializeEditor = (editor: LexicalEditor): string => {
  return JSON.stringify(editor.getEditorState().toJSON());
};

export const safeLoadEditorState = (editor: LexicalEditor, json?: string) => {
  if (!json) return; // 빈 문자열이면 기본 빈 상태를 유지
  try {
    const state = editor.parseEditorState(json);
    editor.setEditorState(state);
  } catch (e) {
    console.error('EditorState 파싱에 실패, 빈 상태로 초기화', e);
  }
};
