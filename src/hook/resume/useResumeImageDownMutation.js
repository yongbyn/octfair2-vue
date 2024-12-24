import { useMutation } from "@tanstack/vue-query";
import { resumeImageDownApi } from "../../api/resume/resumeImageDownApi";

export const useResumeImageDownMutation = () => {
  return useMutation({
    mutationKey: ["resumeImageDown"],
    mutationFn: (idx, fileName) => resumeImageDownApi(idx, fileName), // ResumeMain 내 HTML코드에서 handlerImageDownBtn(resume.resIdx)에 입력된 resume.resIdx가 여기의 idx에 입력된다.
  });
};
