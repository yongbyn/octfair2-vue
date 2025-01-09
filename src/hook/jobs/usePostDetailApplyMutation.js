import { useMutation } from "@tanstack/vue-query";
import { postDetailApplyApi } from "../../api/jobs/postDetailApplyApi";

export const usePostDetailApplyMutation = () => {
  return useMutation({
    mutationKey: ["postApply"],
    mutationFn: ({ resumeIdx, postIdx, onSuccess }) => {
      postDetailApplyApi(resumeIdx, postIdx, onSuccess);
    },
    onSuccess: () => {},
  });
};
