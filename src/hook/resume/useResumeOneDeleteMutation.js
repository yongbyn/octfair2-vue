import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { resumeOneDeleteApi } from "../../api/resume/resumeOneDeleteApi";

export const useResumeOneDeleteMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["resumeDelete"],
    mutationFn: (idx) => resumeOneDeleteApi(idx),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["resumeList"],
      });
    },
  });
};
