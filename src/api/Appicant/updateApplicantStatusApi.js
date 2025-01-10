import axios from "axios";
import { Applicant } from "../api";

export const updateApplicantStatusApi = async (keyword, postIdx, loginId) => {
  let bodyData = {
    keyword: keyword.value,
    postIdx: postIdx.value,
    loginId: loginId.value,
  };

  ///prx/api/manage-hire/statusUpdate.do
  let res = await axios.post(Applicant.ApplicantStatusUpdate, bodyData);

  keyword.value = "";
  postIdx.value = "";
  loginId.value = "";
};
