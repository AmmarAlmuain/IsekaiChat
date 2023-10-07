import { parseISO, formatDistanceToNow } from 'date-fns';

export const formatDate = (date: string) => {
    return formatDistanceToNow(parseISO(date), { addSuffix: true });
}