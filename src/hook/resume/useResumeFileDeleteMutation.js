import { useMutation } from "@tanstack/vue-query";
import { resumeFileDeleteApi } from "../../api/resume/resumeFileDeleteApi";

export const useResumeFileDeleteMutation = (resIdx) => {
  return useMutation({
    mutationKey: ["resumeFileDelete"],
    mutationFn: () => resumeFileDeleteApi(resIdx),
  });
};
