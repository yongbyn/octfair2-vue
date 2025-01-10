import { toast } from "@/common/toastMessage";
import axios from "axios";
import { MyPage } from "../api";

export const deleteUserApi = async (loginId, password) => {
  // // bcrypt용
  //   const requestBody = {
  //     loginId,
  //     password,
  //   };
  //   const result = await axios.post(MyPage.DeleteUserBcrypt, requestBody);

  const params = new URLSearchParams();
  params.append("loginId", loginId);
  params.append("password", password);

  const result = await axios.post(MyPage.DeleteUser, params, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  if (result.data.result === "success") {
    toast.info("계정이 삭제되었습니다.");
  } else {
    toast.warning("비밀번호가 틀렸습니다. 다시 시도해주세요");
  }
  return result;
};
