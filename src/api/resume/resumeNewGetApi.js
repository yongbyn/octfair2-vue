import { useUserInfo } from "@/stores/userInfo";
import axios from "axios";
import { Resume } from "../api";

export const resumeNewGetApi = async (isCreated) => {
  const userInfo = useUserInfo();

  const param = {
    loginId: userInfo.user.loginId,
    userNm: userInfo.user.userNm,
    userType: userInfo.user.userType,
  };

  isCreated.value = true;
  const result = await axios.post(Resume.GetResumeNew, param);
  return result.data;
};
