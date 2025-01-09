import axios from "axios";
import { Applicant } from "../api";

export const applicantDetailSearchApi = async (params) => {
  const result = await axios.post(Applicant.SearchApplicantDetail, {
    loginId: params.loginId,
  });
  return result.data;
};
