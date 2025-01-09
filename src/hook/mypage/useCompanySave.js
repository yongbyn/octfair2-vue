import { useMutation } from "@tanstack/vue-query";
import { companySaveApi } from "../../api/mypage/companySaveApi";

export const useCompanySave = (companySave, fileData) => {
  return useMutation({
    mutationFn: () => companySaveApi(companySave, fileData),
  });
};
