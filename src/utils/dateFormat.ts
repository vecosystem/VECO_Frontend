export const formatDate = (date: Date) => {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${month}월 ${day}일`;
};

export const toFormattedDate = (date: Date | null): string | null =>
  date ? formatDate(date) : null;
