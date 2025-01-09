import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { careerNewDeleteApi } from "../../../../api/apply/resume/career/careerNewDeleteApi";

export const useCareerNewDeleteMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["careerDelete"],
    mutationFn: ({ resIdx, crrIdx }) => careerNewDeleteApi(resIdx, crrIdx),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["careerList"],
      });
    },
  });
};
