import axios from "axios";
import { Resume } from "../../api";

export const resumeOneDeleteApi = async (resIdx) => {
  const param = { resIdx: resIdx };

  const result = await axios.post(Resume.DeleteResumeOne, param);
  return result.data;
};
