import { useMutation } from "@tanstack/vue-query";
import { updatePwdApi } from "../../api/mypage/updatePwdApi";

export const useUpdatePwd = (updatePwd, updateStatus) => {
  return useMutation({
    mutationFn: () => updatePwdApi(updatePwd, updateStatus),
  });
};
