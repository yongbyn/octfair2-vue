import { useQuery } from "@tanstack/vue-query";
import { noticeDetailSearchApi } from "../../api/notice/noticeDetailSearchApi.";

export const useNoticeDetail = (detailValue, idx, fileData) => {
  console.log(fileData);
  return useQuery({
    queryKey: ["noticeDetail"],
    queryFn: () => noticeDetailSearchApi(detailValue, idx, fileData),
  });
};
