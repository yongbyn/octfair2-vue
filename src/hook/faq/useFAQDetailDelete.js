import { QueryClient, useMutation, useQueryClient } from "@tanstack/vue-query";
import { useRouter } from "vue-router";
import { faqDetailDeleteApi } from "../../api/faq/faqDetailDeleteApi";

export const useFAQDetailDelete = (params) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["faqDelete"],
    mutationFn: () => faqDetailDeleteApi(params.faq_idx),
    onSuccess: () => {
      router.go(-1);
      QueryClient.invalidateQueries({
        queryKey: ["faqList"],
      });
    },
  });
};
