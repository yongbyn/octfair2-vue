import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { useRouter } from "vue-router";
import { noticeDetailUpdateApi } from "../../api/notice/noticeDetailUpdateApi";

export const useNoticeDetailUpdateMutation = (detailValue, idx, fileData) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationKey: ["noticeUpdate", idx],
    mutationFn: () => noticeDetailUpdateApi(detailValue, idx, fileData),
    onSuccess: () => {
      router.go(-1);
      queryClient.invalidateQueries({
        queryKey: ["noticeList"],
      });
    },
  });
};
