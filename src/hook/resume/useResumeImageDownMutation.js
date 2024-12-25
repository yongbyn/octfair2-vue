import { useMutation } from "@tanstack/vue-query";
import { resumeImageDownApi } from "../../api/resume/resumeImageDownApi";

export const useResumeImageDownMutation = () => {
  return useMutation({
    mutationKey: ["resumeImageDown"],
    mutationFn: ({ idx, fileName }) => resumeImageDownApi(idx, fileName),
  });
};
