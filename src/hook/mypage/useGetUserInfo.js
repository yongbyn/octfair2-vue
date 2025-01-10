import { useMutation } from "@tanstack/vue-query";
import { getUserInfoApi } from "../../api/mypage/getUserInfoApi";

export const useGetUserInfo = (user, updateUserInfo) => {
  return useMutation({
    // mutationKey: ["getUserInfo"],
    mutationFn: () => getUserInfoApi(user, updateUserInfo),
  });
};
