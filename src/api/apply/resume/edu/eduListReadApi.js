import axios from "axios";
import { Resume } from "../../../api";

export const eduListReadApi = async (resIdx) => {
  const param = { resIdx: resIdx.value };

  let result;
  if (resIdx.value) result = await axios.post(Resume.ReadEduList, param);
  return result.data;
};
