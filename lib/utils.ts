import { format, parseISO } from 'date-fns';

export function formatDate(date: string | Date): string {
  if (typeof date === 'string') {
    return format(parseISO(date), 'MMM dd, yyyy');
  }
  return format(date, 'MMM dd, yyyy');
}

export function formatTime(time: string): string {
  const [hours, minutes] = time.split(':');
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour % 12 || 12;
  return `${displayHour}:${minutes} ${ampm}`;
}

export function formatDateTime(date: string, time: string): string {
  return `${formatDate(date)} at ${formatTime(time)}`;
}

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}