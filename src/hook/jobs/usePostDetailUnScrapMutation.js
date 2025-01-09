import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { postDetailUnScrapApi } from "../../api/jobs/postDetailUnScrapApi";

export const usePostDetailUnScrapMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["postUnScrap"],
    mutationFn: ({ postIdx, sortDelete }) => {
      postDetailUnScrapApi(postIdx, sortDelete);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["postDetail"],
      });
    },
  });
};
