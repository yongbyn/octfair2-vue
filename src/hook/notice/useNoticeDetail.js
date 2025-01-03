import { useQuery } from "@tanstack/vue-query";
import { noticeDetailSearchApi } from "../../api/notice/noticeDetailSearchApi.";

export const useNoticeDetail = (params) => {
  return useQuery({
    queryKey: ["noticeDetail"],
    queryFn: () => noticeDetailSearchApi(params),
    enabled: !!params.idx, // !!(undefine) => false
  });
};
