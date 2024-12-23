import { useMutation } from "@tanstack/vue-query";
import { signUpIdCheckApi } from "../../api/login/signUpIdCheckApi";

export const useSignUpIdCheck = (userId) => {
  return useMutation({
    //mutationKey: ['idCheck'],
    mutationFn: () => signUpIdCheckApi(userId),
  });
};
