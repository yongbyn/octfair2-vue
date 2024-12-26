import { useQuery } from "@tanstack/vue-query";
import { faqListSearchApi } from "../../api/faq/faqListSearchApi";

export const useFAQListQuery = (injectedValue, cPage, usertype) => {
  return useQuery({
    queryKey: ["faqList", injectedValue, cPage], // key에 넣으면 watch와 같은 효과
    queryFn: () => faqListSearchApi(injectedValue.value, cPage.value, usertype),
    staleTime: 1000 * 60,
  });
};
