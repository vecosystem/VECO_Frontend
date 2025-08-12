// EnterAsParagraphPlugin.tsx
// 엔터 키를 치면 새로운 paragraph 블록을 생성하는 플러그인

import { useEffect } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {
  KEY_ENTER_COMMAND,
  COMMAND_PRIORITY_LOW,
  $getSelection,
  $isRangeSelection,
  $createParagraphNode,
} from 'lexical';
import { $isCodeNode } from '@lexical/code';

export default function EnterAsParagraphPlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return editor.registerCommand(
      KEY_ENTER_COMMAND,
      (e: KeyboardEvent) => {
        // Shift+Enter는 소프트 줄바꿈: 기본 동작 사용(개입하지 않음)
        if (e.shiftKey) return false;

        // 기본 엔터를 새 문단으로 강제
        let handled = false;
        editor.update(() => {
          const selection = $getSelection();
          if (!$isRangeSelection(selection)) return;

          const top = selection.anchor.getNode().getTopLevelElementOrThrow();

          // 코드블록 안에서는 엔터 = 새 줄(기본 동작 유지)
          if ($isCodeNode(top)) return;

          e.preventDefault();

          // 현재 블록을 문단 보장(헤딩/인용 등도 엔터 시 새 문단 시작하도록)
          if (top.getType() !== 'paragraph') {
            const para = $createParagraphNode();
            top.replace(para);
            para.selectEnd();
          }

          // 새 문단 삽입
          const newPara = $createParagraphNode();
          top.insertAfter(newPara);
          newPara.select(); // 커서를 새 문단 시작으로
          handled = true; // 처리 완료
        });
        return handled;
      },
      COMMAND_PRIORITY_LOW
    );
  }, [editor]);

  return null;
}
