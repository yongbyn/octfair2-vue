import axios from "axios";
import { MyPage } from "../api";

export const updatePwdApi = async (updatePwd, updateStatus) => {
  const result = await axios.post(MyPage.UpdatePwd, updatePwd.value);

  if (result.data.result === "success") {
    updateStatus.value = 1;
  } else if (result.data.result === "fail1") {
    // 현재 비밀번호가 불일치
    updateStatus.value = 2;
  } else if (result.data.result === "fail2") {
    updateStatus.value = 3;
  }

  return result.data;
};
