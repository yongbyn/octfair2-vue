import { useMutation } from "@tanstack/vue-query";
import { findPwdUpdateApi } from "../../api/login/findPwdUpdateApi"

export const useFindPwdUpdate = (findPwdUserInfo) => {
  return useMutation({
    mutationFn: () => findPwdUpdateApi(findPwdUserInfo),
  });
};
