import axios from "axios";
import { Resume } from "../../api";

export const skillListReadApi = async (resIdx) => {
  const param = { resIdx: resIdx.value };

  const result = await axios.post(Resume.ReadSkillList, param);
  return result.data;
};
