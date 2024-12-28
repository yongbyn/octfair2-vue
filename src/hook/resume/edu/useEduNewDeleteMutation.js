import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { eduNewDeleteApi } from "../../../api/resume/edu/eduNewDeleteApi";

export const useEduNewDeleteMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["eduDelete"],
    mutationFn: ({ resIdx, eduIdx }) => eduNewDeleteApi(resIdx, eduIdx),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["eduList"],
      });
    },
  });
};
