import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { skillNewDeleteApi } from "../../../../api/apply/resume/skill/skillNewDeleteApi";

export const useSkillNewDeleteMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["skillDelete"],
    mutationFn: ({ resIdx, skillIdx }) => skillNewDeleteApi(resIdx, skillIdx),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["skillList"],
      });
    },
  });
};
