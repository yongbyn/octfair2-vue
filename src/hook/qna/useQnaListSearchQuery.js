import { useQuery } from "@tanstack/vue-query";
import { qnaListSearchApi } from "../../api/qna/qnaListSearchApi";

export const useQnaListSearchQuery = (cPage, injectedValue, type) => {
  return useQuery({
    queryKey: ["qnaListData", cPage, injectedValue],
    queryFn: () => qnaListSearchApi(cPage, injectedValue, type),
    staleTime: 1000 * 60,
  });
};
