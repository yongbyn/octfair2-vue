import axios from "axios";
import { Resume } from "../api";
import { useUserInfo } from "../../stores/userInfo";

export const resumeDetailReadApi = async (resIdx, resume, isEditable) => {
  const param = { resIdx: resIdx.value };
  const userInfo = useUserInfo();

  let result;
  if (resIdx.value) {
    result = await axios.post(Resume.ReadResumeDetail, param);
    resume.value = { ...result.data.payload }; // 일괄매칭
    resume.value.pfoLink = result.data.payload.proLink; // Spring Mapper 오타매칭
    isEditable.value = userInfo.user.userIdx == result.data.payload.user_idx; // 로그인유저정보와 작성자정보의 일치판단
  }
  return result.data;
};
