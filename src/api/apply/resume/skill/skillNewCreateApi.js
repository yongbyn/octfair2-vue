import axios from "axios";
import { Resume } from "../../../api";

export const skillNewCreateApi = async (resIdx, skill) => {
  const param = {
    ...skill,
    resIdx: resIdx,
  };

  const result = await axios.post(Resume.CreateSkillNew, param);
  return result.data;
};
