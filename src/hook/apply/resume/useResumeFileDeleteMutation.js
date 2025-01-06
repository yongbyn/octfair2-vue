import { useMutation } from "@tanstack/vue-query";
import { resumeFileDeleteApi } from "../../../api/apply/resume/resumeFileDeleteApi";

export const useResumeFileDeleteMutation = (resIdx) => {
  return useMutation({
    mutationKey: ["resumeFileDelete"],
    mutationFn: () => {
      const isYes = window.confirm("정말 파일을 삭제하시겠습니까?");
      if (!isYes) resumeFileDeleteApi(resIdx);
    },
  });
};
