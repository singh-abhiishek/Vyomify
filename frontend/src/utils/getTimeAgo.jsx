// utils/getTimeAgo.js
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

/**
 * Returns a human-readable "time ago" string from a given date.
 * @param {string | Date} date - The ISO string or Date object to convert.
 * @returns {string} - For example: "3 minutes ago", "2 days ago"
 */
export function getTimeAgo(date) {
  if (!date) return 'unknown time';
  return dayjs(date).fromNow();
}
