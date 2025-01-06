import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { resumeOneDeleteApi } from "../../../api/apply/resume/resumeOneDeleteApi";

export const useResumeOneDeleteMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["resumeDelete"],
    mutationFn: (resIdx) => {
      const isYes = window.confirm("정말 이력서를 삭제하시겠습니까?");
      if (!isYes) resumeOneDeleteApi(resIdx);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["resumeList"],
      });
    },
  });
};
