// 워크스페이스 이름 유효성 검사 함수
type Validator = (name: string, firstChar: string) => string | null;

const KOREAN = /[가-힣]/;
const START_ALPHA = /^[A-Za-z]/;
const NON_ALNUM = /[^A-Za-z0-9]/;
const ALNUM_SPACE = /^[A-Za-z0-9 ]+$/;

const validators: Validator[] = [
  // 1) 길이
  (name) =>
    name.length < 4 || name.length > 10
      ? '워크스페이스 이름은 4자 이상 10자 이하의 영문 또는 숫자여야 합니다.'
      : null,

  // 2) 첫 글자: 한글/숫자/특수문자 금지 + 영문 시작
  (_, fc) => (KOREAN.test(fc) ? '워크스페이스 이름은 한글로 시작할 수 없습니다.' : null),
  (_, fc) => (/[0-9]/.test(fc) ? '워크스페이스 이름은 숫자로 시작할 수 없습니다.' : null),
  (_, fc) => (NON_ALNUM.test(fc) ? '워크스페이스 이름은 특수문자로 시작할 수 없습니다.' : null),
  (_, fc) => (!START_ALPHA.test(fc) ? '워크스페이스 이름은 영문으로 시작해야 합니다.' : null),

  // 3) 전체 문자열 제약
  (name) => (KOREAN.test(name) ? '워크스페이스 이름에 한글은 사용할 수 없습니다.' : null),
  (name) =>
    !ALNUM_SPACE.test(name) ? '워크스페이스 이름은 영문, 숫자, 공백만 사용할 수 있습니다.' : null,
  (name) => (name.endsWith(' ') ? '워크스페이스 이름은 공백으로 끝날 수 없습니다.' : null),
  (name) => (/ {2,}/.test(name) ? '워크스페이스 이름에 연속된 공백은 사용할 수 없습니다.' : null),
];

export const validateWorkspaceName = (raw: string): string | null => {
  const name = String(raw ?? '');
  const firstChar = name[0] ?? ''; // 빈 문자열일 때도 안전

  for (const v of validators) {
    const msg = v(name, firstChar);
    if (msg) return msg;
  }
  return null;
};
