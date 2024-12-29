import { useUserInfo } from "../../../stores/userInfo";
import axios from "axios";
import { Resume } from "../../api";

export const resumeDetailCreateApi = async (resIdx) => {
  const userInfo = useUserInfo();

  const param = {
    loginId: userInfo.user.loginId,
    userNm: userInfo.user.userNm,
    userType: userInfo.user.userType,
  };

  // resIdx는 Spring-Mapper에서 useGeneratedKeys(=resIdx)로 생성후 받아져온다.
  const result = await axios.post(Resume.CreateResumeDetail, param);
  resIdx.value = result.data.payload.resIdx;
  return result.data;
};
