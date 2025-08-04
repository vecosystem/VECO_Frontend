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

export const formatIsoToDot = (isoString: string): string => {
  const date = new Date(isoString);
  return formatDateDot(date);
};
