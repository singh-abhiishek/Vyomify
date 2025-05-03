import dayjs from 'dayjs';

export const FormatDate = (dateString) => {
  if (!dateString) return '';
  return dayjs(dateString).format('DD MMM YYYY');
};
