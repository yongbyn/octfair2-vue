import axios from "axios";
import { Resume } from "../../api";

export const resumeOneCopyApi = async (resIdx) => {
  const param = { resIdx: resIdx };

  const result = await axios.post(Resume.CopyResumeOne, param);
  return result.data;
};
