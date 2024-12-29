import { useQuery } from "@tanstack/vue-query";
import { skillListReadApi } from "../../../api/resume/skill/skillListReadApi";

export const useSkillListReadQuery = (resIdx) => {
  return useQuery({
    queryKey: ["skillList", resIdx],
    queryFn: () => skillListReadApi(resIdx),
  });
};
