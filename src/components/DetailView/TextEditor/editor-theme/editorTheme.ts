import type { EditorThemeClasses } from 'lexical';

export const theme: EditorThemeClasses = {
  list: {
    ul: 'ml-[0.4rem] list-disc list-inside',
    ol: 'ml-[0.2rem] list-decimal list-inside',
    listitem: 'my-1 mx-4',
    nested: { listitem: 'list-none' },

    // 체크리스트는 pseudo-element가 필요해서 커스텀 클래스 사용
    listitemChecked: 'tw-listitem-checked',
    listitemUnchecked: 'tw-listitem-unchecked',
  },

  // 코드블럭도 ::before + attr(data-gutter) 필요 → 커스텀 클래스 사용
  code: 'tw-code',

  // 인라인 토큰
  text: {
    bold: 'font-bold',
    italic: 'italic',
    underline: 'underline',
    code: 'text-gray-600 bg-gray-200 py-1 px-2 font-mono rounded-lg text-[94%]',
  },

  // 코드 하이라이트(구문 강조)에서 사용되는 토큰
  codeHighlight: {
    comment: 'text-gray-500', // 코드 주석 색깔
    punctuation: 'text-gray-500', // 코드 구두점, 문장부호 색깔
  },
};
