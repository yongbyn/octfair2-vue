import { Resume } from "../api";
import axios from "axios";

export const resumeOneCopyApi = async (idx) => {
  const param = { resIdx: idx };

  const result = await axios.post(Resume.CopyResumeOne, param);
  return result.data;
};
