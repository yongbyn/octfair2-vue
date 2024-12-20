import { useQuery } from "@tanstack/vue-query";
import { postListSearchApi } from "../../api/jobs/postListSearchApi";

export const usePostListSearchQuery = (injectedValue, cPage) => {
  return useQuery({
    queryKey: ["postList", injectedValue, cPage], // key에 넣으면 watch와 같은 효과
    queryFn: () => postListSearchApi(injectedValue.value, cPage.value),
    staleTime: 1000 * 60,
  });
};
