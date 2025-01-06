import { useMutation } from "@tanstack/vue-query";
import { findPwdApi } from "../../api/login/findPwdApi";

export const useFindPwd = (findPwdUserInfo, findPwdCheck) => {
  return useMutation({
    mutationFn: () => findPwdApi(findPwdUserInfo, findPwdCheck),
  });
};
