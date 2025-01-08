import axios from "axios";
import { Resume } from "../../../api";

export const certNewCreateApi = async (resIdx, cert) => {
  const param = {
    ...cert,
    acqDate: cert.acqDate + "-01", // 이력서에 기간은 월단위인게 일반적이며 but DB엔 일자까지 입력이 되야하여 01일을 넣어주는 코드
    resIdx: resIdx,
  };

  const result = await axios.post(Resume.CreateCertNew, param);
  return { result: result.data.result, cert: cert };
};
