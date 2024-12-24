import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { resumeDetailCopyApi } from "../../api/resume/resumeDetailCopyApi";

export const useResumeDetailCopyMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["resumeCopy"],
    mutationFn: (idx) => resumeDetailCopyApi(idx), // ResumeMain 내 HTML코드에서 handlerCopyResumeBtn(resume.resIdx)에 입력된 resume.resIdx가 여기의 idx에 입력된다.
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["resumeList"],
      });
    },
  });
};
