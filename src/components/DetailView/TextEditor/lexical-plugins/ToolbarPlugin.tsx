// ToolbarPlugin.tsx
// Lexical 에디터의 툴바를 구현하는 플러그인

// 버튼 아이콘 import
import btn_bold from '../../../../assets/icons/text-editor/ooui_bold-b.svg';
import btn_italic from '../../../../assets/icons/text-editor/codicon_italic.svg';
import btn_underline from '../../../../assets/icons/text-editor/teenyicons_underline-solid.svg';
import btn_line from '../../../../assets/icons/text-editor/teenyicons_line-solid.svg';
import btn_bullet from '../../../../assets/icons/text-editor/icon-park_list.svg';
import btn_number from '../../../../assets/icons/text-editor/icon-park_list-number.svg';
import btn_check from '../../../../assets/icons/text-editor/icon-park_list-check.svg';
import btn_code from '../../../../assets/icons/text-editor/tabler_code.svg';

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useCallback, useEffect, useState, type FC } from 'react';
import {
  INSERT_UNORDERED_LIST_COMMAND,
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_CHECK_LIST_COMMAND,
} from '@lexical/list';
import {
  INSERT_HORIZONTAL_RULE_COMMAND,
  $createHorizontalRuleNode,
} from '@lexical/react/LexicalHorizontalRuleNode';
import { $createTextNode, $insertNodes } from 'lexical';
import { $isListNode, ListNode } from '@lexical/list';
import { $getNearestNodeOfType } from '@lexical/utils';
import { $getSelection, $isRangeSelection } from 'lexical';
import { $createCodeNode } from '@lexical/code';
import { $setBlocksType } from '@lexical/selection';
import { FORMAT_TEXT_COMMAND } from 'lexical';
import TopScrollSync from '../TopScrollSync';
import { $createParagraphNode } from 'lexical';
import { $isElementNode } from 'lexical';

// 지원하는 블록 타입 정의
const SupportedBlockType = {
  paragraph: 'paragraph',
  bullet: 'Bulleted List',
  number: 'Numbered List',
  check: 'Check List',
  code: 'Code Block',
} as const;

type BlockType = keyof typeof SupportedBlockType;

export const ToolbarPlugin: FC = () => {
  const [blockType, setBlockType] = useState<BlockType>('paragraph');
  const [editor] = useLexicalComposerContext();

  // 인라인 스타일 상태
  const [isBold, setIsBold] = useState(false); // 볼드 처리
  const [isUnderline, setIsUnderline] = useState(false); // 밑줄 처리
  const [isItalic, setIsItalic] = useState(false); // 이탤릭체
  const [isCode, setIsCode] = useState(false); // 인라인 코드

  // 블록 타입 동기화
  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const selection = $getSelection();
        if (!$isRangeSelection(selection)) return;

        const anchorNode = selection.anchor.getNode();
        const targetNode =
          anchorNode.getKey() === 'root' ? anchorNode : anchorNode.getTopLevelElementOrThrow();

        if ($isListNode(targetNode)) {
          const parentList = $getNearestNodeOfType(anchorNode, ListNode);
          const listType = parentList ? parentList.getListType() : targetNode.getListType();

          setBlockType(listType);
        } else {
          const nodeType = targetNode.getType();
          if (nodeType in SupportedBlockType) {
            setBlockType(nodeType as BlockType);
          } else {
            setBlockType('paragraph');
          }
        }
      });
    });
  }, [editor]);

  // 인라인 포맷 동기화
  useEffect(() => {
    const unregister = editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const selection = $getSelection();

        if (!$isRangeSelection(selection)) return;

        setIsBold(selection.hasFormat('bold'));
        setIsUnderline(selection.hasFormat('underline'));
        setIsItalic(selection.hasFormat('italic'));
        setIsCode(selection.hasFormat('code'));
      });
    });
    return unregister;
  }, [editor]);

  // 불렛 리스트로 변환하는 핸들러
  const formatBulletList = useCallback(() => {
    if (blockType !== 'bullet') {
      editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
    }
  }, [blockType, editor]);

  // 숫자 리스트로 변환하는 핸들러
  const formatNumberedList = useCallback(() => {
    if (blockType !== 'number') {
      editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
    }
  }, [blockType, editor]);

  // 체크 리스트로 변환하는 핸들러
  const formatCheckList = useCallback(() => {
    if (blockType !== 'check') {
      editor.dispatchCommand(INSERT_CHECK_LIST_COMMAND, undefined);
    }
  }, [blockType, editor]);

  const smartToggleCode = useCallback(() => {
    editor.update(() => {
      const selection = $getSelection();
      if (!$isRangeSelection(selection)) return;

      // 코드블록 상태면 문단으로 되돌리기 (토글)
      const anchorTop = selection.anchor.getNode().getTopLevelElementOrThrow();
      if (anchorTop.getType() === 'code') {
        $setBlocksType(selection, () => $createParagraphNode());
        return;
      }

      // 선택 범위 분석
      const text = selection.getTextContent(); // 개행으로 여러 줄 여부 판단
      const isMultiLine = text.includes('\n');

      // 선택이 걸친 최상위 블록 수 계산
      const topBlocks = Array.from(
        new Set(
          selection
            .getNodes()
            .map((n) => ($isElementNode(n) ? n : n.getParentOrThrow()).getTopLevelElementOrThrow())
        )
      ).filter((b) => b.getType() !== 'root');
      const spansMultipleBlocks = topBlocks.length > 1;

      if (isMultiLine || spansMultipleBlocks) {
        // 여러 줄/여러 블록 → 하나의 코드 블록으로 병합
        const joined = topBlocks.map((b) => b.getTextContent()).join('\n');
        const code = $createCodeNode();
        code.append($createTextNode(joined));

        const first = topBlocks[0];
        first.replace(code); // 첫 블록을 코드블록으로 교체
        for (let i = 1; i < topBlocks.length; i++) {
          topBlocks[i].remove(); // 나머지 블록 제거
        }
        code.selectEnd();
      } else {
        // 한 줄/단일 블록 → 인라인 코드
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'code');
      }
    });
  }, [editor]);

  // 가로 구분선 삽입 함수
  const insertHorizontalRule = useCallback(() => {
    // 포커스 보장 후 삽입 시도
    editor.focus();
    const handled = editor.dispatchCommand(INSERT_HORIZONTAL_RULE_COMMAND, undefined);

    // 환경에 따라 커맨드가 처리 안되면 직접 노드 삽입
    if (!handled) {
      editor.update(() => {
        const hr = $createHorizontalRuleNode();
        $insertNodes([hr]);
      });
    }
  }, [editor]);

  // 공통 버튼 클래스: 선택 시 회색 배경 유지, 아니면 hover만
  const activeClass = 'bg-gray-200';
  const hoverClass = 'hover:bg-gray-200';

  return (
    <TopScrollSync>
      {(scrollRef) => (
        <div
          ref={scrollRef}
          className="flex w-full p-[0.8rem] gap-[0.8rem] border-b border-gray-300 min-w-max min-h-max resize-none"
        >
          {/* 볼드 처리 버튼 */}
          <button
            type="button"
            aria-label="format bold"
            role="checkbox"
            aria-checked={isBold}
            onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold')}
            className={`${isBold ? activeClass : hoverClass} rounded`}
          >
            <img src={btn_bold} alt="bullet button" />
          </button>

          {/* 이탤릭 처리 버튼 */}
          <button
            type="button"
            aria-label="format italic"
            role="checkbox"
            aria-checked={isItalic}
            onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic')}
            className={`${isItalic ? activeClass : hoverClass} rounded`}
          >
            <img src={btn_italic} alt="bullet button" />
          </button>

          {/* 밑줄 처리 버튼 */}
          <button
            type="button"
            aria-label="format underline"
            role="checkbox"
            aria-checked={isUnderline}
            onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline')}
            className={`${isUnderline ? activeClass : hoverClass} rounded`}
          >
            <img src={btn_underline} alt="bullet button" />
          </button>

          {/* 구분선 삽입 */}
          <button
            type="button"
            aria-label="Insert horizontal rule"
            onClick={insertHorizontalRule}
            className={hoverClass + ' rounded'}
            title="Horizontal Rule"
          >
            <img src={btn_line} alt="horizontal line" />
          </button>

          {/* 불렛 리스트 버튼 */}
          <button
            type="button"
            role="checkbox"
            title={SupportedBlockType['bullet']}
            aria-label={SupportedBlockType['bullet']}
            aria-checked={blockType === 'bullet'}
            onClick={formatBulletList}
            className={`${blockType === 'bullet' ? activeClass : hoverClass} rounded`}
          >
            <img src={btn_bullet} alt="bullet button" />
          </button>
          {/* 숫자 리스트 버튼 */}
          <button
            type="button"
            role="checkbox"
            title={SupportedBlockType['number']}
            aria-label={SupportedBlockType['number']}
            aria-checked={blockType === 'number'}
            onClick={formatNumberedList}
            className={`${blockType === 'number' ? activeClass : hoverClass} rounded`}
          >
            <img src={btn_number} alt="bullet button" />
          </button>
          {/* 체크리스트 버튼 */}
          <button
            type="button"
            role="checkbox"
            title={SupportedBlockType['check']}
            aria-label={SupportedBlockType['check']}
            aria-checked={blockType === 'check'}
            onClick={formatCheckList}
            className={`${blockType === 'check' ? activeClass : hoverClass} rounded`}
          >
            <img src={btn_check} alt="bullet button" />
          </button>

          {/**
           * 코드 (블록 또는 인라인 코드)
           * - 한 줄 선택하거나, 그냥 입력하면 인라인 코드가 된다.
           * - 여러줄 선택하면 코드블록이 된다.
           */}
          <button
            type="button"
            role="checkbox"
            title={SupportedBlockType['code']}
            aria-label={SupportedBlockType['code']}
            aria-checked={blockType === 'code' || isCode}
            onClick={smartToggleCode}
            className={`${blockType === 'code' || isCode ? activeClass : hoverClass} rounded`}
          >
            <img src={btn_code} alt="code button" />
          </button>
        </div>
      )}
    </TopScrollSync>
  );
};
