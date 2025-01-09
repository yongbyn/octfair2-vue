import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { postDetailDoScrapApi } from "../../api/jobs/postDetailDoScrapApi";

export const usePostDetailDoScrapMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["postDoScrap"],
    mutationFn: ({ postIdx }) => {
      postDetailDoScrapApi(postIdx);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["postDetail"],
      });
    },
  });
};
