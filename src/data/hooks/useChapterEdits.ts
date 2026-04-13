import { useQuery } from "@tanstack/react-query";
import * as chapterService from "@/infrastructure/api/chapters"
import { unwrapResult } from "@/data/types"

export const useChapterEdits = (chapterId: string) => useQuery({
    queryKey: ['chapters', 'edits', chapterId],
    queryFn: () => chapterService.getEdits(chapterId).then(unwrapResult),
    refetchIntervalInBackground: true,
})