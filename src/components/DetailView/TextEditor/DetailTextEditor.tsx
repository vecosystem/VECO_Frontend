// DetailTextEditor.tsx
// 상세페이지 설명 작성 컴포넌트

import { type ComponentProps } from 'react';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { AutoFocusPlugin } from './lexical-plugins/AutoFocusPlugin';
import { EditableTogglePlugin } from './lexical-plugins/EditableTogglePluggin';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { lexicalnodes } from '../../../constants/lexicalnodes';
import { ToolbarPlugin } from './lexical-plugins/ToolbarPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { CheckListPlugin } from '@lexical/react/LexicalCheckListPlugin';
import { CodeHighlightPlugin } from './lexical-plugins/CodeHighlightPlugin';
import { theme } from './editor-theme/editorTheme';
import IndentPlugin from './lexical-plugins/IndentPlugin';
import EnterAsParagraphPlugin from './lexical-plugins/EnterAsParagraphPlugin';
import type { SubmitHandleRef } from './lexical-plugins/SubmitHandlePlugin';
import SubmitHandlePlugin from './lexical-plugins/SubmitHandlePlugin';

// 부모 컴포넌트에서 전달하는 props
interface DetailTextEditorProps {
  isEditable: boolean; // 편집가능 여부 - true일 때만 상세 설명 내용 입력 가능.
  editorSubmitRef: React.RefObject<SubmitHandleRef | null>;
}

// initialConfig: LexicalEditor의 초기 설정 (필수 요소)
const initialConfig: ComponentProps<typeof LexicalComposer>['initialConfig'] = {
  namespace: 'DetailTextEditor',
  onError: (e) => console.error(e),
  nodes: lexicalnodes, // Lexical에서 사용할 커스텀 노드 클래스 목록을 전달.
  theme: theme,

  // TODO: 수정 모드나 조회 모드에서 받은 content JSON을 렌더링하기 위한 초기 설정 (추후 API 연동시 반영)
  // editorState: (editor) => safeLoadEditorState(editor, initialContentJson),
};

const DetailTextEditor = ({ isEditable, editorSubmitRef }: DetailTextEditorProps) => {
  return (
    <div className="w-full h-full flex-1 overflow-y-scroll basic-scroll resize-none">
      {/* LexicalComposer: LexicalEditor 인스턴스 생성 -> Context.Provider를 통해 전달 */}
      <LexicalComposer initialConfig={initialConfig}>
        {/* 텍스트에디터 Container */}
        <div className="w-full h-full">
          {/* 텍스트에디터 Toolbar: 편집 모드에서만 보이도록 */}
          {isEditable && (
            <div className="sticky top-0 z-20 basic-scroll bg-gray-100">
              <ToolbarPlugin />
            </div>
          )}
          <ListPlugin />
          <CheckListPlugin />
          <CodeHighlightPlugin />
          <IndentPlugin />
          <EnterAsParagraphPlugin />
          <SubmitHandlePlugin ref={editorSubmitRef} /> {/* 부모의 ref 그대로 전달 */}
          {/* 텍스트에디터 본문 Contents */}
          <div className="relative flex-1 editor-root group">
            <RichTextPlugin
              contentEditable={
                // contentEditable 컴포넌트 (내용 편집 속성을 가진 div 요소 생성을 위한 컴포넌트)
                <ContentEditable
                  className={
                    'w-full h-full flex-1 font-body-r text-gray-600 focus:outline-none pt-[1.6rem] pr-4'
                  }
                />
              }
              // 편집 불가할 경우 placeholder를 숨김
              placeholder={
                isEditable ? (
                  <div className="absolute top-[1.6rem] left-0 pointer-events-none font-body-r text-gray-400">
                    상세 설명 추가
                  </div>
                ) : null
              }
              ErrorBoundary={LexicalErrorBoundary}
            />
          </div>
          <HistoryPlugin /> {/* undo/redo 기능(ctrl + z 기능) 제공 */}
          <EditableTogglePlugin isEditable={isEditable} /> {/* 에디터 편집 가능 상태 토글 */}
          <AutoFocusPlugin /> {/* 에디터가 마운트될 때 자동으로 포커스 설정*/}
        </div>
      </LexicalComposer>
    </div>
  );
};

export default DetailTextEditor;
