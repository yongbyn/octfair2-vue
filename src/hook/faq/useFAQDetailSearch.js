import { useQuery } from "@tanstack/vue-query";
import { faqDetailSearchApi } from "../../api/faq/faqDetailSearchApi";

export const useFAQDetailSearch = (detailValue, faq_idx) => {
  return useQuery({
    queryKey: ["faqDetail", faq_idx],
    queryFn: () => faqDetailSearchApi(detailValue, faq_idx),
  });
};
