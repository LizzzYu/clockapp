import { DateTime } from 'luxon';

/**
 * format the current time of specific timezone
 * @param timezone - timezone string, example: 'Asia/Taipei'
 * @param format - time format, example: 'HH:mm', 'HH:mm' as default
 * @returns time string after formatted
 */
export const getFormattedTime = (timezone: string, format: string = 'HH:mm'): string => {
  if (!timezone) {
    console.error('Invalid timezone provided');
    return 'Invalid Timezone';
  }
  return DateTime.now().setZone(timezone).toFormat(format);
};
