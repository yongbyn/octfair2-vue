import { useMutation } from "@tanstack/vue-query";
import { updateUserApi } from "../../api/mypage/updateUserApi";

export const useUpdateUser = (updateUserInfo) => {
    return useMutation({
    mutationFn: () => updateUserApi(updateUserInfo),
    });
};
