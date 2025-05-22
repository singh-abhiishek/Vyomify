const LEADING_ZERO_FORMATTER = new Intl.NumberFormat(undefined, {
    minimumIntegerDigits: 2,
  });
  
  export const  formatDuration = (duration) => {
    const hours = Math.floor(duration / 3600); // 60 * 60
    const minutes = Math.floor((duration % 3600) / 60);
    const seconds = Math.floor(duration % 60);
  
    if (hours > 0) {
      return `${hours}:${LEADING_ZERO_FORMATTER.format(minutes)}:${LEADING_ZERO_FORMATTER.format(seconds)}`;
    }
  
    return `${minutes}:${LEADING_ZERO_FORMATTER.format(seconds)}`;
  }
  