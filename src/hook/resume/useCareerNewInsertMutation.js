import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { careerNewInsertApi } from "../../api/resume/careerNewInsertApi";

export const useCareerNewInsertMutation = (resIdx) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["careerInsert"],
    mutationFn: (career) => careerNewInsertApi(career, resIdx),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["careerList"],
      });
    },
  });
};
