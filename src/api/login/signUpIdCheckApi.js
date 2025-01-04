import { toast } from "@/common/toastMessage";
import axios from "axios";
import { Login } from "../api";

export const signUpIdCheckApi = async (signUpUserInfo) => {
  let data = { loginId: signUpUserInfo.value.loginId.value };
  const result = await axios.post(Login.SignUpIdCheck, data);

  if (result.data.result === "success") {
    toast.error("중복된 ID입니다.");
    signUpUserInfo.value.loginId.state = false;
    document.getElementById('loginId').focus();  
  } else {
    toast.success("사용 가능한 ID입니다.");
    signUpUserInfo.value.loginId.state = true;
  }

  return result.data.result;
};
