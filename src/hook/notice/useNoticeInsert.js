import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { useRouter } from "vue-router";
import { noticeDetailInsertApi } from "../../api/notice/noticeDetailInsertApi";

export const useNoticeInsert = (detailValue, loginId, fileData) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["noticeInsert", loginId, fileData],
    mutationFn: () => {
      // fileData가 ref인 경우 .value로 접근
      const file = fileData?.value || null;
      return noticeDetailInsertApi(detailValue.value, loginId, file);
    },
    onSuccess: () => {
      // 등록 후 이전 페이지로 이동
      router.go(-1);

      // 공지사항 목록 조회 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: ["noticeList"], // 공지사항 목록 키로 변경
      });
    },
  });
};
