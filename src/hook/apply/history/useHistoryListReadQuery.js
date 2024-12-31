import { useQuery } from "@tanstack/vue-query";
import { historyListReadApi } from "../../../api/apply/history/historyListReadApi";

export const useHistoryListReadQuery = (
  itemPerPage,
  currentPage,
  injectedHistorySearchValue
) => {
  return useQuery({
    queryKey: ["historyList", currentPage, injectedHistorySearchValue],
    queryFn: () =>
      historyListReadApi(itemPerPage, currentPage, injectedHistorySearchValue),
  });
};
