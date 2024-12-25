import { Resume } from "../api";
import axios from "axios";

export const careerNewInsertApi = async (career, resIdx) => {
  const param = {
    ...career,
    startDate: career.startDate + "-01", // 이력서에 경력기간은 월단위인게 일반적이며 but DB엔 일자까지 입력이 되야하여 01일을 넣어주는 코드
    endDate: career.endDate + "-01",
    resIdx: resIdx.value,
  };

  const result = await axios.post(Resume.InsertCareerNew, param);
  return result.data;
};
