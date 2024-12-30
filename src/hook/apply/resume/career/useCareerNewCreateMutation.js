import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { careerNewCreateApi } from "../../../../api/apply/resume/career/careerNewCreateApi";

export const useCareerNewCreateMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["careerCreate"],
    mutationFn: ({ resIdx, career }) => careerNewCreateApi(resIdx, career),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["careerList"],
      });
    },
  });
};
