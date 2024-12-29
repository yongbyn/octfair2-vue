import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { resumeDetailUpdateApi } from "../../../api/apply/resume/resumeDetailUpdateApi";

export const useResumeDetailUpdateMutation = (fileData) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["resumeUpdate"],
    mutationFn: ({ resIdx, resume }) =>
      resumeDetailUpdateApi(resIdx, resume, fileData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["resumeList"],
      });
    },
  });
};
