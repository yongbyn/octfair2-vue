import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { resumeOneDeleteApi } from "../../../api/apply/resume/resumeOneDeleteApi";

export const useResumeOneDeleteMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["resumeDelete"],
    mutationFn: (resIdx) => resumeOneDeleteApi(resIdx),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["resumeList"],
      });
    },
  });
};
