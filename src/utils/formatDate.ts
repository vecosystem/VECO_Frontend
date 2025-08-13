export const formatDate = (date: Date) => {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${month}월 ${day}일`;
};

export const formatDateDot = (date: Date): string => {
  const yy = date.getFullYear().toString().slice(-2); // 연도 뒤 2자리만 사용
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${yy}.${mm}.${dd}`;
};

export const formatDateTimeDot = (input: Date | string): string => {
  const date = input instanceof Date ? input : new Date(input);
  const yy = date.getFullYear().toString().slice(-2); // 연도 뒤 2자리
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  const hh = String(date.getHours()).padStart(2, '0');
  const mi = String(date.getMinutes()).padStart(2, '0');
  const ss = String(date.getSeconds()).padStart(2, '0');
  return `${yy}.${mm}.${dd} ${hh}:${mi}:${ss}`;
};

export const formatIsoToDot = (isoString: string): string => {
  const date = new Date(isoString);
  return formatDateDot(date);
};
