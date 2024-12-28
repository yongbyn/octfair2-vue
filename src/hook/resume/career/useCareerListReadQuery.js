import { useQuery } from "@tanstack/vue-query";
import { careerListReadApi } from "../../../api/resume/career/careerListReadApi";

export const useCareerListReadQuery = (resIdx) => {
  return useQuery({
    queryKey: ["careerList"],
    queryFn: () => careerListReadApi(resIdx),
  });
};
