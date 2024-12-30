import axios from "axios";
import { Resume } from "../../api";

export const resumeFileDeleteApi = async (resIdx) => {
  const param = { resIdx: resIdx.value };

  const result = await axios.post(Resume.DeleteResumeFile, param);
  return result.data;
};
