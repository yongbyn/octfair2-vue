import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { companyDeleteApi } from "../../api/mypage/companyDeleteApi";

export const useCompanyDelete = (companySave, fileData) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => companyDeleteApi(companySave, fileData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getCompanyInfo"],
      });
    },
  });
};
