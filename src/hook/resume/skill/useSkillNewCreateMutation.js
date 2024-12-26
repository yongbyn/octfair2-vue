import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { skillNewCreateApi } from "../../../api/resume/skill/skillNewCreateApi";

export const useSkillNewCreateMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["skillCreate"],
    mutationFn: ({ resIdx, skill }) => skillNewCreateApi(resIdx, skill),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["skillList"],
      });
    },
  });
};
