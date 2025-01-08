import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { useRouter } from "vue-router";
import { postDetailDeleteApi } from "../../api/jobs/postDetailDeleteApi";

export const usePostDetailDeleteMutation = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["postDelete"],
    mutationFn: ({ bizIdx, postIdx }) => {
      postDetailDeleteApi(bizIdx, postIdx);
    },
    onSuccess: () => {
      router.go(-1);
      queryClient.invalidateQueries({
        queryKey: ["postList"],
      });
    },
  });
};
