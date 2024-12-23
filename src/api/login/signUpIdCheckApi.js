import axios from "axios";
import { Login } from "../api";
import { toast } from "@/common/toastMessage";

export const signUpIdCheckApi = async (userId) => {
  let param = new URLSearchParams();
  param.append("loginId", userId.value);
  const postAction = {
    url: Login.SignUpIdCheck,
    method: "POST",
    data: param,
    responseType: "json",
  };

  const result = await axios(postAction);
  // if(result.data === 1) {
  //     toast.error("중복된 ID입니다.");
  // } else {
  //     toast.success("사용 가능한 ID입니다.");
  // }
  return result.data;
};
