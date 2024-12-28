import axios from "axios";
import { Resume } from "../../api";

export const skillNewDeleteApi = async (resIdx, skillIdx) => {
  const param = {
    resIdx: resIdx,
    skillIdx: skillIdx,
  };

  const result = await axios.post(Resume.DeleteSkillNew, param);
  return result.data;
};
