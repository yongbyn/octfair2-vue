import axios from "axios";
import { Resume } from "../../../api";

export const careerListReadApi = async (resIdx) => {
  const param = { resIdx: resIdx.value };

  let result;
  if (resIdx.value) result = await axios.post(Resume.ReadCareerList, param);
  return result.data;
};
