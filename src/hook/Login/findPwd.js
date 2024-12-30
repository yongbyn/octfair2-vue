import { useMutation } from "@tanstack/vue-query";
import { findPwdApi } from "../../api/login/findPwdApi";

export const findPwd = (findPwdUserInfo) => {
  return useMutation({
    mutationFn: () => findPwdApi(findPwdUserInfo),
  });
};
