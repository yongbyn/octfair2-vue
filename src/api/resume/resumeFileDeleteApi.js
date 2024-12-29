import { Resume } from "../api";
import axios from "axios";

export const resumeFileDeleteApi = async (resIdx) => {
  const param = { resIdx: resIdx.value };

  const result = await axios.post(Resume.DeleteResumeFile, param);
  return result.data;
};
