import { useMutation } from "@tanstack/vue-query";
import { companyUpdateApi } from "../../api/mypage/companyUpdateApi";

export const useCompanyUpdate = (companySave, fileData) => {
  return useMutation({
    mutationFn: () => companyUpdateApi(companySave, fileData),
  });
};
