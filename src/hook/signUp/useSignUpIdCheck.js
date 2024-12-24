import { useMutation } from "@tanstack/vue-query";
import { signUpIdCheckApi } from "../../api/login/signUpIdCheckApi";

export const useSignUpIdCheck = (userId, isChecked) => {
  return useMutation({
    mutationFn: () => signUpIdCheckApi(userId, isChecked),
  });
};
