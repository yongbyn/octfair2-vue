import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { certNewDeleteApi } from "../../../api/resume/cert/certNewDeleteApi";

export const useCertNewDeleteMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["certDelete"],
    mutationFn: ({ resIdx, certIdx }) => certNewDeleteApi(resIdx, certIdx),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["certList"],
      });
    },
  });
};
