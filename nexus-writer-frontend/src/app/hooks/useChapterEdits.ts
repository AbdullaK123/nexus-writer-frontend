import { useQuery } from "@tanstack/react-query";
import * as chapterService from "@/app/services/chapterService"

export const useChapterEdits = (chapterId: string) => useQuery({
    queryKey: ['chapters', 'edits', chapterId],
    queryFn: () => chapterService.getEdits(chapterId),
    refetchIntervalInBackground: true,
})