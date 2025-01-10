import { updateMyQnaApi } from "../../api/qna/updateMyQnaApi";

import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { useRouter } from "vue-router";

export const useQnaMyUpdateMutation = (fileData, userInfo, QnaDetail) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["myQnaUpdate"],
    mutationFn: () => {
      const fullData = ref(null);

      const textData = {
        loginId: userInfo.user.loginId,
        qnaSeq: QnaDetail.value.qnaIdx,
        qnaTit: QnaDetail.value.title,
        qnaCon: QnaDetail.value.content,
        password: QnaDetail.value.password,
        ans_content: QnaDetail.value.ans_content,
      };

      const formData = new FormData();
      formData.append("file", fileData.value);

      formData.append(
        "text",
        new Blob([JSON.stringify(textData)], {
          type: "application/json",
        })
      );

      fullData.value = formData;

      return updateMyQnaApi(fullData);
    },
    onSuccess: () => {
      router.go(-1);
      queryClient.invalidateQueries({
        queryKey: ["qnaListData"],
      });
    },
  });
};
