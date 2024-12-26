import axios from "axios";
import { Resume } from "../../api";

export const careerNewDeleteApi = async (resIdx, crrIdx) => {
  const param = {
    resIdx: resIdx,
    crrIdx: crrIdx,
  };

  const result = await axios.post(Resume.DeleteCareerNew, param);
  return result.data;
};
