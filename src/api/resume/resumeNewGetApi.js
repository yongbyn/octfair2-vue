import { useUserInfo } from "@/stores/userInfo";
import { Resume } from "../api";
import axios from "axios";

export const resumeNewGetApi = async (isCreated, resIdx) => {
  const userInfo = useUserInfo();

  const param = {
    loginId: userInfo.user.loginId,
    userNm: userInfo.user.userNm,
    userType: userInfo.user.userType,
  };

  const result = await axios.post(Resume.GetResumeNew, param);
  resIdx.value = result.data.payload.resIdx;
  isCreated.value = true;
  return result.data;
};
