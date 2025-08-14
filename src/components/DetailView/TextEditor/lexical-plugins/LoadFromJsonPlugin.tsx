// LoadFromJsonPlugin.tsx
// 마운트/갱신 시점에 JSON 주입하는 로더 플러그인

import { useEffect } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { loadEditorStateFromJson } from '../../../../utils/editorStateIO';

type Props = { json?: string | object };

export default function LoadFromJsonPlugin({ json }: Props) {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    if (!json) return;
    loadEditorStateFromJson(editor, json);
  }, [editor, json]);

  return null;
}
