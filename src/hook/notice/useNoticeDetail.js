import { useQuery } from "@tanstack/vue-query";
import { noticeDetailSearchApi } from "../../api/notice/noticeDetailSearchApi.";

export const useNoticeDetail = (detailValue, idx, fileData) => {
  return useQuery({
    queryKey: ["noticeDetail", idx],
    queryFn: () => noticeDetailSearchApi(detailValue, idx, fileData),
  });
};
