import { Resume } from "../api";
import axios from "axios";

export const resumeOneDeleteApi = async (idx) => {
  const param = { resIdx: idx };

  const result = await axios.post(Resume.DeleteResumeOne, param);
  return result.data;
};
