import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { resumeDetailDeleteApi } from "../../api/resume/resumeDetailDeleteApi";

export const useResumeDetailDeleteMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["resumeDelete"],
    mutationFn: (idx) => resumeDetailDeleteApi(idx),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["resumeList"],
      });
    },
  });
};
