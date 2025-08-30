import { formatDistanceToNow } from "date-fns";

export const getBadgeCss = (status: string) => {
    const normalizedStatus = status.toLowerCase();
    if (normalizedStatus === 'published') return 'published-chapter-number-badge';
    if (normalizedStatus === 'draft') return 'draft-chapter-number-badge';
    return 'outline-chapter-number-badge';
}

export const getStatusIndicatorClass = (status: string) => {
    const normalizedStatus = status.toLowerCase();
    if (normalizedStatus === 'published') return 'published';
    if (normalizedStatus === 'draft') return 'draft';
    return 'outline';
}

export const formatWordCount = (count: number) => {
    if (!count) return '0 words'
    if (count === 0) return '0 words';
    if (count >= 1000) return `${(count / 1000).toFixed(1)}k words`;
    return `${count} words`;
}

export const getDuration = (date: Date) => {
    return formatDistanceToNow(date, { addSuffix: true })
}

export const formatWordCountStory = (count: number | undefined) => {
    if (!count) return 0;

    if (count >= 1000) {
        return `${(count / 1000).toFixed(1)}k`
    }
    return count.toString()
}