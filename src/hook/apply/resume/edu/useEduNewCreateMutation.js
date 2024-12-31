import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { eduNewCreateApi } from "../../../../api/apply/resume/edu/eduNewCreateApi";

export const useEduNewCreateMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["eduCreate"],
    mutationFn: ({ resIdx, edu }) => eduNewCreateApi(resIdx, edu),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["eduList"],
      });
    },
  });
};
