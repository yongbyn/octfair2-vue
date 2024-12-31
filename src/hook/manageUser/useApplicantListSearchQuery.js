import { useQuery } from "@tanstack/vue-query";
import { applicantListSearchApi } from "../../api/manageUser/applicantListSearchApi";

export const useApplicantListSearchQuery = (injectedValue, cPage) => {
  console.log("injectedValue", injectedValue.value);
  return useQuery({
    queryKey: ["applicantList", injectedValue, cPage],
    queryFn: () => applicantListSearchApi(injectedValue.value, cPage.value),
    staleTime: 1000 * 60,
  });
};
