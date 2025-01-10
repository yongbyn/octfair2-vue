import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { useRouter } from "vue-router";
import { faqDetailDeleteApi } from "../../api/faq/faqDetailDeleteApi";

export const useFAQDetailDelete = (faq_idx) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["faqDelete"],
    mutationFn: () => faqDetailDeleteApi(faq_idx),
    onSuccess: () => {
      router.go(-1);
      queryClient.invalidateQueries({
        queryKey: ["faqList"],
      });
    },
  });
};
