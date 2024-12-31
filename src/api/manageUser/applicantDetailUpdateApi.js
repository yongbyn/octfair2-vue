import axios from "axios";
import { Applicant } from "../api";

export const applicantDetailUpdateApi = async (detailValue, loginId) => {
  const requestBody = {
    ...detailValue,
    loginId,
  };

  axios.post(Applicant.UpdateApplicantDetail, requestBody).then((res) => {
    if (res.data.result == "success") {
    } else {
      alert("다시 시도해주세요.");
    }
  });
};
