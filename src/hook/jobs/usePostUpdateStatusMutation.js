import { useMutation } from "@tanstack/vue-query";
import { useRouter } from "vue-router";
import { postDetailUpdateStatusApi } from "../../api/jobs/postDetailUpdateStatusApi";

export const usePostUpdateStatusMutation = () => {
  const router = useRouter();

  return useMutation({
    mutationKey: ["postUpdateStatus"],
    mutationFn: ({ postIdx, appStatus }) => {
      return postDetailUpdateStatusApi(postIdx, appStatus).then(() => ({
        appStatus,
      }));
    },
    onSuccess: (data) => {
      alert("처리되었습니다.");
      router.push({
        name: data.appStatus === "승인" ? "posts" : "approval-post",
      });
    },
  });
};
