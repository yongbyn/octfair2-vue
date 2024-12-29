import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { historyOneCancleApi } from "../../../api/apply/history/historyOneCancleApi";

export const useHistoryOneCancleMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["historyCancle"],
    mutationFn: (appId) => historyOneCancleApi(appId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["historyList"],
      });
    },
  });
};
