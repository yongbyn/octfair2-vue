import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { useRouter } from "vue-router";
import { noticeDetailDeleteApi } from "../../api/notice/noticeDetailDeleteApi";

export const useNoticeDelete = (params) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["noticeDelete"],
    mutationFn: () => noticeDetailDeleteApi(params.idx),
    onSuccess: () => {
      router.go(-1);
      queryClient.invalidateQueries({
        queryKey: ["noticeList"],
      });
    },
  });
};