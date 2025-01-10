import axios from "axios";
import { Applicant } from "../api";

export const getMDetailApi = async (
  postIdx,
  MDetail,
  choiceStatus,
  provideMDVal
) => {
  let res = await axios.post(Applicant.ApplicantManagerGetId);

  MDetail.value.Md = [...res.data.MDetail];

  // postIdx.value = res.data.MDetail[0].postIdx;

  let hirProcessArr = new Array();
  let temporayryArr = new Array();
  res.data.MDetail.forEach((item) => {
    let i = 0;
    let { hirProcess } = item;
    hirProcessArr = hirProcess.match(/[가-힣]+/g);
  });

  choiceStatus.value = hirProcessArr[0];
  hirProcessArr.push("합격");
  hirProcessArr.push("탈락");

  MDetail.value.hirProcess = [...hirProcessArr];

  provideMDVal.value = hirProcessArr;

  postIdx.value = res.data.MDetail[0].postIdx;

  return res.data.MDetail;
};
