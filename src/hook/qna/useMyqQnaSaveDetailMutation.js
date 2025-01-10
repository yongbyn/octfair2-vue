import { toast } from "@/common/toastMessage";
import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { useRouter } from "vue-router";
import { MyQnaSaveDetailApi } from "../../api/qna/MyQnaSaveDetailApi";

export const useMyqQnaSaveDetailMutation = (formData) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["saveMyQna"],
    mutationFn: () => MyQnaSaveDetailApi(formData),
    onSuccess: () => {
      toast.info("질문작성을 완료하였습니다.");
      queryClient.invalidateQueries({
        queryKey: ["qnaListData"],
      });

      router.replace({
        name: "qna",
      });
    },
  });
};
