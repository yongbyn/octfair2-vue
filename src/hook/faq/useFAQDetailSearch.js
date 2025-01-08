import { useQuery } from "@tanstack/vue-query";
import { faqDetailSearchApi } from "../../api/faq/faqDetailSearchApi";

export const useFAQDetailSearch = (params) => {
  return useQuery({
    queryKey: ["faqDetail"],
    queryFn: () => faqDetailSearchApi(params),
    // enabled: !!params.faq_idx, // !!(undefine) => false
  });
};
