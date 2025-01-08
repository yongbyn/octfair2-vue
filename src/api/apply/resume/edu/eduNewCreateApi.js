import axios from "axios";
import { Resume } from "../../../api";

export const eduNewCreateApi = async (resIdx, edu) => {
  const param = {
    ...edu,
    admDate: edu.admDate + "-01",
    grdDate: edu.grdDate + "-01",
    resIdx: resIdx,
  };

  const result = await axios.post(Resume.CreateEduNew, param);
  return { result: result.data.result, edu: edu };
};
