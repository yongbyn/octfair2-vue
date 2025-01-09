import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { useRouter } from "vue-router";
import { noticeDetailInsertApi } from "../../api/notice/noticeDetailInsertApi";

export const useNoticeInsert = (detailValue, idx, fileData) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["noticeSave"],
    mutationFn: () => noticeDetailInsertApi(detailValue, idx, fileData),
    onSuccess: () => {
      router.go(-1);
      queryClient.invalidateQueries({
        // 'noticeList'란 key로 NoticeMain에 있는 useQuery를 가동시켜 list 새로고침
        queryKey: ["noticeList"],
      });
    },
  });
};
