import { useQuery } from "@tanstack/vue-query";
import { resumeListReadApi } from "../../api/resume/resumeListReadApi";

export const useResumeListReadQuery = (cPage, itemPerPage) => {
  return useQuery({
    queryKey: ["resumeList", cPage],
    queryFn: () => resumeListReadApi(cPage, itemPerPage),
  });
};
