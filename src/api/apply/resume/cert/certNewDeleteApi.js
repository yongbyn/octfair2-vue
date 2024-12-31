import axios from "axios";
import { Resume } from "../../../api";

export const certNewDeleteApi = async (resIdx, certIdx) => {
  const param = {
    resIdx: resIdx,
    certIdx: certIdx,
  };

  const result = await axios.post(Resume.DeleteCertNew, param);
  return result.data;
};
