import { useQuery } from "@tanstack/vue-query";
import { resumeListReadApi } from "../../../api/apply/resume/resumeListReadApi";

export const useResumeListReadQuery = (itemPerPage, currentPage) => {
  return useQuery({
    queryKey: ["resumeList", currentPage],
    queryFn: () => resumeListReadApi(itemPerPage, currentPage),
  });
};
