import axios from "axios";
import { Resume } from "../../../api";

export const eduNewDeleteApi = async (resIdx, eduIdx) => {
  const param = {
    resIdx: resIdx,
    eduIdx: eduIdx,
  };

  const result = await axios.post(Resume.DeleteEduNew, param);
  return result.data;
};
