import { useQuery } from "@tanstack/vue-query";
import { certListReadApi } from "../../../api/resume/cert/certListReadApi";

export const useCertListReadQuery = (resIdx) => {
  return useQuery({
    queryKey: ["certList", resIdx],
    queryFn: () => certListReadApi(resIdx),
  });
};
