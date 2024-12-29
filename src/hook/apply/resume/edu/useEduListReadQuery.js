import { useQuery } from "@tanstack/vue-query";
import { eduListReadApi } from "../../../../api/apply/resume/edu/eduListReadApi";

export const useEduListReadQuery = (resIdx) => {
  return useQuery({
    queryKey: ["eduList", resIdx],
    queryFn: () => eduListReadApi(resIdx),
  });
};
