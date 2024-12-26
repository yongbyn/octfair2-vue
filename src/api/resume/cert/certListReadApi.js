import axios from "axios";
import { Resume } from "../../api";

export const certListReadApi = async (resIdx) => {
  const param = { resIdx: resIdx.value };

  const result = await axios.post(Resume.ReadCertList, param);
  return result.data;
};
