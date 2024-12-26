import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { resumeNewUpdateApi } from "../../api/resume/resumeNewUpdateApi";

export const useResumeNewUpdateMutation = (fileData) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["resumeUpdate"],
    mutationFn: ({ resIdx, resTitle, resume }) =>
      resumeNewUpdateApi(resIdx, resTitle, resume, fileData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["resumeList"],
      });
    },
  });
};
