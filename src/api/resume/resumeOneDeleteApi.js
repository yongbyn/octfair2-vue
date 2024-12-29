import { Resume } from "../api";
import axios from "axios";

export const resumeOneDeleteApi = async (resIdx) => {
  const param = { resIdx: resIdx };

  const result = await axios.post(Resume.DeleteResumeOne, param);
  return result.data;
};
