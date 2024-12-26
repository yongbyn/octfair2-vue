import { useUserInfo } from "@/stores/userInfo";
import axios from "axios";
import { Resume } from "../api";

export const resumeNewCreateApi = async (resIdx) => {
  const userInfo = useUserInfo();

  const param = {
    loginId: userInfo.user.loginId,
    userNm: userInfo.user.userNm,
    userType: userInfo.user.userType,
  };

  const result = await axios.post(Resume.CreateResumeNew, param);
  resIdx.value = result.data.payload.resIdx;
  return result.data;
};
