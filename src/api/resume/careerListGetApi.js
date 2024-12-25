import { Resume } from "../api";
import axios from "axios";

export const careerListGetApi = async (resIdx) => {
  const param = { resIdx: resIdx.value };

  const result = await axios.post(Resume.GetCareerList, param);
  return result.data;
};
