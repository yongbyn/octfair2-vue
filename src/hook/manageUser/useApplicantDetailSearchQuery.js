import { useQuery } from "@tanstack/vue-query";
import { applicantDetailSearchApi } from "../../api/manageUser/applicantDetailSearchApi";

export const useApplicantDetailSearchQuery = (params) => {
  return useQuery({
    queryKey: ["applicantDetail"],
    queryFn: () => applicantDetailSearchApi(params),
    enabled: !!params.loginId,
  });
};
