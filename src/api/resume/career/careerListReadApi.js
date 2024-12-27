import axios from "axios";
import { Resume } from "../../api";

export const careerListReadApi = async (resIdx) => {
  const param = { resIdx: resIdx.value };

  const result = await axios.post(Resume.ReadCareerList, param);
  return result.data;
};
