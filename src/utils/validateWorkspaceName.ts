// 워크스페이스 이름 유효성 검사 함수
export const validateWorkspaceName = (name: string): string | null => {
  const trimmed = name.trim();

  // 이름 길이 검사
  if (trimmed.length < 4 || trimmed.length > 10) {
    return '워크스페이스 이름은 4자 이상 10자 이하여야 합니다.';
  }

  const firstChar = trimmed[0];

  // 첫 글자 유효성 검사
  if (/[0-9]/.test(firstChar)) {
    return '워크스페이스 이름은 숫자로 시작할 수 없습니다.';
  }

  if (/[^a-zA-Z0-9]/.test(firstChar)) {
    return '워크스페이스 이름은 특수문자로 시작할 수 없습니다.';
  }

  if (!/^[a-z]/.test(firstChar)) {
    return '워크스페이스 이름은 소문자로 시작해야 합니다.';
  }

  // 전체 문자열 유효성 검사
  if (!/^[a-z0-9]+$/.test(trimmed)) {
    return '워크스페이스 이름은 영문 소문자와 숫자만 사용할 수 있습니다.';
  }

  return null; // 유효한 경우
};
