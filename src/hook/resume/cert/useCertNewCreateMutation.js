import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { certNewCreateApi } from "../../../api/resume/cert/certNewCreateApi";

export const useCertNewCreateMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["certCreate"],
    mutationFn: ({ resIdx, cert }) => certNewCreateApi(resIdx, cert),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["certList"],
      });
    },
  });
};
