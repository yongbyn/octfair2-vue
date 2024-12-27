import { toast } from "@/common/toastMessage";
import axios from "axios";
import { Login } from "../api";

export const signUpIdCheckApi = async (signUpValid, isIdCheck) => {
  let data = { loginId: signUpValid.value.userId };
  const result = await axios.post(Login.SignUpIdCheck, data);

  const idCheckBtn = document.querySelector(".idCheckBtn");
  /*
  const result = await axios.post(Login.SignUpIdCheck, data);
  const result = await axios.post(Login.SignUpIdCheck+"?loginId=admin"); // URLquery -> RequestParam
  const result = await axios.post(Login.SignUpIdCheck, new URLSearchParmas({loginId: userId.value})); // 2번째칸(URLSearchparams()) -> RequestParam
  const result = await axios.post(Login.SignUpIdCheck, "", { params : { Headers: }}); // 3번째칸(헤더:param) -> Requestparam
  const result = await axios.post(Login.SignUpIdCheck, { loginId: admin }); // JSON -> Request'Body'
  */
  if (result.data.result === "success") {
    toast.error("중복된 ID입니다.");
    idCheckBtn.style.backgroundColor = "red";
    isIdCheck.value = false;
  } else {
    toast.success("사용 가능한 ID입니다.");
    idCheckBtn.style.backgroundColor = "green";
    isIdCheck.value = true;
  }
  document.body.style.idCheckBtn = idCheckBtn;

  return result.data.result;
};
