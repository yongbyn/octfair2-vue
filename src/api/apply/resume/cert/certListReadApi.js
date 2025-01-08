import axios from "axios";
import { Resume } from "../../../api";

export const certListReadApi = async (resIdx) => {
  const param = { resIdx: resIdx.value };

  let result;
  if (resIdx.value) result = await axios.post(Resume.ReadCertList, param);
  return result.data;
};
