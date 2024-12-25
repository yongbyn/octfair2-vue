import { Resume } from "../api";
import axios from "axios";

export const resumeDetailCopyApi = async (idx) => {
  const param = { resIdx: idx };

  const result = await axios.post(Resume.CopyResumeDetail, param);
  return result.data;
};
