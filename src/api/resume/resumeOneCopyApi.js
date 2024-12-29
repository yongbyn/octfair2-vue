import { Resume } from "../api";
import axios from "axios";

export const resumeOneCopyApi = async (resIdx) => {
  const param = { resIdx: resIdx };

  const result = await axios.post(Resume.CopyResumeOne, param);
  return result.data;
};
