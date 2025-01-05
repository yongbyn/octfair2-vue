import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { useRouter } from "vue-router";
import { faqDetailUpdateApi } from "../../api/faq/faqDetailUpdateApi";

export const useFAQDetailUpdate = (detailValue, faq_idx) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationKey: ["faqUpdate"],
    mutationFn: () => faqDetailUpdateApi(detailValue.value, faq_idx),
    onSuccess: () => {
      router.go(-1);
      queryClient.invalidateQueries({
        queryKey: ["faqList"],
      });
    },
  });
};