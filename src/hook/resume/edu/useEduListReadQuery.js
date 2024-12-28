import { useQuery } from "@tanstack/vue-query";
import { eduListReadApi } from "../../../api/resume/edu/eduListReadApi";

export const useEduListReadQuery = (resIdx) => {
  return useQuery({
    queryKey: ["eduList"],
    queryFn: () => eduListReadApi(resIdx),
  });
};
