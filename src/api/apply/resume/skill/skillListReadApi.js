import axios from "axios";
import { Resume } from "../../../api";

export const skillListReadApi = async (resIdx) => {
  const param = { resIdx: resIdx.value };

  let result;
  if (resIdx.value) result = await axios.post(Resume.ReadSkillList, param);
  return result.data;
};
