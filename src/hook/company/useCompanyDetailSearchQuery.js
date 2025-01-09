import { useQuery } from "@tanstack/vue-query";
import { companyDetailSearchApi } from "../../api/company/companyDetailSearchApi";

export const useCompanyDetailSearchQuery = (bizIdx) => {
  return useQuery({
    queryKey: ["bizDetail"],
    queryFn: () => companyDetailSearchApi(bizIdx),
  });
};
