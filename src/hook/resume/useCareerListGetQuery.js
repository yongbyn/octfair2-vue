import { useQuery } from "@tanstack/vue-query";
import { careerListGetApi } from "../../api/resume/careerListGetApi";

export const useCareerListGetQuery = (resIdx) => {
  return useQuery({
    queryKey: ["careerList"],
    queryFn: () => careerListGetApi(resIdx),
  });
};
