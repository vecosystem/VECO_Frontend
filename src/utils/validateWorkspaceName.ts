// 워크스페이스 이름 유효성 검사 함수
export const validateWorkspaceName = (name: string): string | null => {
  const trimmed = name.trim();

  // 1. 길이 검사
  if (trimmed.length < 4 || trimmed.length > 10) {
    return '워크스페이스 이름은 4자 이상 10자 이하의 영문 또는 숫자여야 합니다.';
  }

  const firstChar = trimmed[0]; // 앞뒤 공백 제거

  // 2. 첫 글자 한글 금지
  if (/[가-힣]/.test(firstChar)) {
    return '워크스페이스 이름은 한글로 시작할 수 없습니다.';
  }

  // 3. 첫 글자 숫자 금지
  if (/[0-9]/.test(firstChar)) {
    return '워크스페이스 이름은 숫자로 시작할 수 없습니다.';
  }

  // 4. 첫 글자 특수문자 금지
  if (/[^a-zA-Z0-9]/.test(firstChar)) {
    return '워크스페이스 이름은 특수문자로 시작할 수 없습니다.';
  }

  // 5. 첫 글자 영문이어야 함
  if (!/^[a-zA-Z]/.test(firstChar)) {
    return '워크스페이스 이름은 영문으로 시작해야 합니다.';
  }

  // 6. 전체 문자열에 한글 포함되면 안 됨
  if (/[가-힣]/.test(trimmed)) {
    return '워크스페이스 이름에 한글은 사용할 수 없습니다.';
  }

  // 7. 전체 문자열은 영문 또는 숫자만 허용
  if (!/^[a-zA-Z0-9]+$/.test(trimmed)) {
    return '워크스페이스 이름은 영문 또는 숫자만 사용할 수 있습니다.';
  }

  return null; // 유효한 경우
};
