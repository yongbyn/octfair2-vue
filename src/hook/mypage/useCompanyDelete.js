import { useMutation } from "@tanstack/vue-query";
import { companyDeleteApi } from "../../api/mypage/companyDeleteApi";

export const useCompanyDelete = (companySave) => {
  return useMutation({
    mutationFn: () => companyDeleteApi(companySave),
  });
};
