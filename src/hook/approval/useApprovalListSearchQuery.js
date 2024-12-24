import { useQuery } from "@tanstack/vue-query";
import { approvalListSearchApi } from "../../api/approval/approvalListSearchApi";

export const useApprovalListSearchQuery = (injectedValue, cPage) => {
  return useQuery({
    queryKey: ["approvalList", injectedValue, cPage], // key에 넣으면 watch와 같은 효과
    queryFn: () => approvalListSearchApi(injectedValue.value, cPage.value),
    staleTime: 1000 * 60,
  });
};
