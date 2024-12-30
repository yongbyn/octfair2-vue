import { toast } from "@/common/toastMessage";
import axios from "axios";
import { Login } from "../api";

export const findPwdApi = async (findPwdUserInfo) => {
  const result = await axios.post(Login.FindPwd, findPwdUserInfo.value);

  if (result.data.result === "SUCCESS") {
    toast.success("확인되었습니다.\n비밀번호를 바꿉니다.");
    findPwdUserInfo.value.findPwdCheck = result.data;
  } else {
    toast.error("잘못 입력하였습니다.\n다시 입력해주세요.");
  }

  return result.data;
};
