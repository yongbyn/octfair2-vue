import { Resume } from "../api";
import axios from "axios";

export const resumeDetailDeleteApi = async (idx) => {
  const param = { resIdx: idx };

  const result = await axios.post(Resume.DeleteResumeDetail, param);
  return result.data;
};
