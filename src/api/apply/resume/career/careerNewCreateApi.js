import axios from "axios";
import { Resume } from "../../../api";

export const careerNewCreateApi = async (resIdx, career) => {
  const param = {
    ...career,
    startDate: career.startDate + "-01", // 이력서에 기간은 월단위인게 일반적이며 but DB엔 일자까지 입력이 되야하여 01일을 넣어주는 코드
    endDate: career.endDate + "-01",
    resIdx: resIdx,
  };

  const result = await axios.post(Resume.CreateCareerNew, param);
  return result.data;
};
