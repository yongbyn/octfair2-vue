import { useMutation } from "@tanstack/vue-query";
import { signUpIdCheckApi } from "../../api/login/signUpIdCheckApi";

export const useSignUpIdCheck = (signUpUserInfo, idState) => {
  return useMutation({
    mutationFn: () => signUpIdCheckApi(signUpUserInfo, idState),
  });
};
