import { useMutation } from "@tanstack/vue-query";
import { findIdApi } from "../../api/login/findIdApi";

export const useFindId = (findIdUserInfo) => {
  return useMutation({
    mutationFn: () => findIdApi(findIdUserInfo),
  });
};
