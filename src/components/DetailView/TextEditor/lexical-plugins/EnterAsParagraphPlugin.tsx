// EnterAsParagraphPlugin.tsx
// 엔터키를 누르면 새 단락을 만들되,
// - Shift+Enter: 기본 소프트 브레이크 유지
// - 리스트 안: 이 플러그인은 관여하지 않음(기본 리스트 엔터 동작 유지)

import { useEffect } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {
  KEY_ENTER_COMMAND,
  COMMAND_PRIORITY_LOW,
  $getSelection,
  $isRangeSelection,
  $createParagraphNode,
  $getRoot,
} from 'lexical';
import { $isCodeNode } from '@lexical/code';
import { $isListNode, $isListItemNode } from '@lexical/list';

export default function EnterAsParagraphPlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return editor.registerCommand(
      KEY_ENTER_COMMAND,
      (e: KeyboardEvent) => {
        // Shift+Enter는 기본 소프트 줄바꿈 유지
        if (e.shiftKey) return false;

        let handled = false;

        editor.update(() => {
          const selection = $getSelection();
          if (!$isRangeSelection(selection)) return;

          const anchor = selection.anchor.getNode();
          const top = anchor.getTopLevelElementOrThrow();

          // ✅ 리스트(ul/ol)나 리스트 아이템 내부라면, 이 플러그인은 개입하지 않음
          //    → return false로 Lexical 기본 리스트 엔터 동작(새 항목 생성/리스트 종료 등)에 맡김
          if ($isListNode(top) || $isListItemNode(top)) {
            handled = false;
            return;
          }

          // 코드블록 안에서는 개입하지 않음(원하는 경우만 허용)
          if ($isCodeNode(top)) {
            handled = false;
            return;
          }

          // 여기부터는 일반 블록일 때만 엔터를 새 단락으로 강제
          const paragraph = $createParagraphNode();
          const root = $getRoot();
          const isRoot = top.getKey() === root.getKey();
          const parent = top.getParent();

          if (isRoot) {
            root.append(paragraph);
          } else if (parent) {
            top.insertAfter(paragraph);
          } else {
            // 만약 top이 detach되어 부모가 없으면 루트에 폴백
            root.append(paragraph);
          }

          paragraph.select();
          handled = true;
        });

        // handled=true면 기본 엔터 동작 막음, false면 기본 로직(리스트 처럼) 진행
        return handled;
      },
      COMMAND_PRIORITY_LOW
    );
  }, [editor]);

  return null;
}
