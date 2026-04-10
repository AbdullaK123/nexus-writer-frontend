import { useQuery } from "@tanstack/react-query";
import * as chapterService from "@/app/services/chapterService"
import { unwrapResult } from "@/app/types"

export const useChapterEdits = (chapterId: string) => useQuery({
    queryKey: ['chapters', 'edits', chapterId],
    queryFn: () => chapterService.getEdits(chapterId).then(unwrapResult),
    refetchIntervalInBackground: true,
})