import { toast } from "@/common/toastMessage";
import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { useRouter } from "vue-router";
import { MyQnaDeleteDetailApi } from "../../api/qna/MyQnaDeleteDetailApi";

export const useMyQnaDeleteMutation = (qnaIdx) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["myQnaDelete"],
    mutationFn: () => MyQnaDeleteDetailApi(qnaIdx),
    onSuccess: () => {
      sessionStorage.removeItem("qnaIdx");
      toast.warning("해당 질문을 삭제하였습니다.");
      queryClient.invalidateQueries({
        queryKey: ["qnaListData"],
      });
      router.replace({
        name: "qna",
      });
    },
  });
};
