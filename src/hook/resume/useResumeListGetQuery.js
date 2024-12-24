import { useQuery } from "@tanstack/vue-query";
import { resumeListGetApi } from "../../api/resume/resumeListGetApi";

export const useResumeListGetQuery = (cPage, itemPerPage) => {
  return useQuery({
    queryKey: ["resumeList", cPage],
    queryFn: () => resumeListGetApi(cPage, itemPerPage),
  });
};
