import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { useRouter } from "vue-router";
import { noticeFileInsertApi } from "../../api/notice/noticeFileInsertApi";

export const useNoticeFileMutation = (detailValue, loginId) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["noticeInsert"],
    mutationFn: () => noticeFileInsertApi(detailValue.value, loginId),
    onSuccess: () => {
      router.go(-1);
      queryClient.invalidateQueries({
        queryKey: ["noticeList"],
      });
    },
  });
};
