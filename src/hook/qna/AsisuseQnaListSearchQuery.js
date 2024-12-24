import { useQuery } from "@tanstack/vue-query";
import { qnaListSearchApi } from "../../api/qna/qnaListSearchApi";

//유즈 쿼리를 등록하며
//표현은 이상하지만
//queryFn 씨가 마치 스프링 인터셉터 처럼처럼 쿼리키와 관련한 모든것을 실행하게 된다.
export const useQnaListSearchQuery = (
  paginData,
  injectedValue,
  qnaList,
  startIndex
) => {
  return useQuery({
    queryKey: ["qnaLists", paginData, injectedValue],
    queryFn: () =>
      qnaListSearchApi(
        paginData.value,
        injectedValue.value,
        qnaList.value,
        startIndex.value
      ),
    staleTime: 1000 * 60,
  });
};
