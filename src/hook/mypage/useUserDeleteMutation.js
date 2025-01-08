import { useMutation } from "@tanstack/vue-query";
import { deleteUserApi } from "../../api/mypage/deleteUserApi";

export const useUserDeleteMutation = () => {
  return useMutation({
    mutationFn: ({ loginId, password }) => {
      deleteUserApi(loginId, password);
    },
  });
};
