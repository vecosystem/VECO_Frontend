// IndentPlugin.tsx
// 탭 동작을 가능하게 하는 플러그인

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {
  KEY_TAB_COMMAND,
  INDENT_CONTENT_COMMAND,
  OUTDENT_CONTENT_COMMAND,
  COMMAND_PRIORITY_LOW,
} from 'lexical';
import { useEffect } from 'react';

export default function IndentPlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return editor.registerCommand(
      KEY_TAB_COMMAND,
      (event: KeyboardEvent) => {
        // 브라우저 기본 포커스 이동 막기
        event.preventDefault();

        if (event.shiftKey) {
          editor.dispatchCommand(OUTDENT_CONTENT_COMMAND, undefined);
        } else {
          editor.dispatchCommand(INDENT_CONTENT_COMMAND, undefined);
        }
        return true;
      },
      COMMAND_PRIORITY_LOW
    );
  }, [editor]);

  return null;
}
