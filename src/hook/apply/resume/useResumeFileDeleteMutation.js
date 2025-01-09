import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { resumeFileDeleteApi } from "../../../api/apply/resume/resumeFileDeleteApi";

export const useResumeFileDeleteMutation = (resIdx) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["resumeFileDelete"],
    mutationFn: () => {
      const isYes = window.confirm("정말 파일을 삭제하시겠습니까?");
      if (isYes) return resumeFileDeleteApi(resIdx);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["resumeList"],
      });
    },
  });
};
