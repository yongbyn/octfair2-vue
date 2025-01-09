import axios from "axios";
import { Resume } from "../../../api";

export const eduNewCreateApi = async (resIdx, edu) => {
  const param = {
    ...edu,
    admDate: edu.admDate + "-01", // 이력서에 기간은 월단위인게 일반적이며 but DB엔 일자까지 입력이 되야하여 01일을 넣어주는 코드
    grdDate: edu.grdDate + "-01",
    resIdx: resIdx,
  };

  const result = await axios.post(Resume.CreateEduNew, param);
  return { result: result.data.result, edu: edu };
};
