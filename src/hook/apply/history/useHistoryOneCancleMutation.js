import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { historyOneCancleApi } from "../../../api/apply/history/historyOneCancleApi";

export const useHistoryOneCancleMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["historyCancle"],
    mutationFn: (appId) => {
      const isYes = window.confirm("정말 지원을 취소하시겠습니까?");
      if (isYes) historyOneCancleApi(appId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["historyList"],
      });
    },
  });
};
