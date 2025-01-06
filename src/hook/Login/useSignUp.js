import { useMutation } from "@tanstack/vue-query";
import { signUpApi } from "../../api/login/signUpApi";

export const useSignUp = (signUpUserInfo) => {
  return useMutation({
    mutationFn: () => signUpApi(signUpUserInfo),
  });
};
