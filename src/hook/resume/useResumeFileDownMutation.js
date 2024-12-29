import { useMutation } from "@tanstack/vue-query";
import { resumeFileDownApi } from "../../api/resume/resumeFileDownApi";

export const useResumeFileDownMutation = () => {
  return useMutation({
    mutationKey: ["resumeFileDown"],
    mutationFn: ({ resIdx, fileName }) => resumeFileDownApi(resIdx, fileName),
  });
};
