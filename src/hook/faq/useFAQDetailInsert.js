import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { useRouter } from "vue-router";
import { faqDetailInsertApi } from "../../api/faq/faqDetailInsertApi";

export const useFAQDetailInsert = (detailValue, faq_type, loginId) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["faqInsert"],
    mutationFn: () => faqDetailInsertApi(detailValue.value, faq_type, loginId),
    onSuccess: () => {
      router.go(-1);
      queryClient.invalidateQueries({
        queryKey: ["faqInsert"],
      });
    },
  });
};