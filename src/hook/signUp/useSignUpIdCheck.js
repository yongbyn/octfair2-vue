import { useMutation } from "@tanstack/vue-query";
import { signUpIdCheckApi } from "../../api/login/signUpIdCheckApi";

export const useSignUpIdCheck = (signUpValid, isIdCheck) => {
  return useMutation({
    mutationFn: () => signUpIdCheckApi(signUpValid, isIdCheck),
  });
};
