import { useMutation } from "@tanstack/vue-query";
import { signUpApi } from "../../api/login/signUpApi";

export const signUp = (signUpUserInfo) => {
    return useMutation({
    mutationFn: () => signUpApi(signUpUserInfo),
    });
};
