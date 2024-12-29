import { useQuery } from "@tanstack/vue-query";
import { careerListReadApi } from "../../../../api/apply/resume/career/careerListReadApi";

export const useCareerListReadQuery = (resIdx) => {
  return useQuery({
    queryKey: ["careerList", resIdx],
    queryFn: () => careerListReadApi(resIdx),
  });
};
