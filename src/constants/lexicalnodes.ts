/**
 * nodes.ts
 * Lexical 텍스트에디터에서 사용할 커스텀 노드들을 정의하는 파일
 *
 * - Lexical의 입력 데이터 단위는 상속하여 만든 LexicalNode 클래스로 표현된다.
 * - 이 파일에서 정의한 노드들은 DetailTextEditor.tsx 컴포넌트에서 LexicalComposer의 initialConfig에 nodes 배열로 전달되어 사용된다.
 */

import { ListItemNode, ListNode } from '@lexical/list';
import { CodeNode, CodeHighlightNode } from '@lexical/code';
import type { Klass, LexicalNode } from 'lexical';
import { HorizontalRuleNode } from '@lexical/react/LexicalHorizontalRuleNode';

export const lexicalnodes: Klass<LexicalNode>[] = [
  ListNode,
  ListItemNode,
  CodeNode,
  CodeHighlightNode,
  HorizontalRuleNode,
];
