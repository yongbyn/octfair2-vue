import axios from "axios";
import { Applicant } from "../api";

export const getApplicantListApi = async (
  postIdx,
  pageSetting,
  choiceStatus,
  injectedValue
) => {
  let bodyData = {
    postIdx: postIdx.value.toString(),
    firstProc: choiceStatus.value,
    keyword: choiceStatus.value,
    currentPage: pageSetting.value.currentPage.toString(),
    pageSize: pageSetting.value.pageSize.toString(),
  };
  let res = await axios.post(Applicant.ApllicantList, bodyData);

  injectedValue.value = {
    list: res.data.list,
    count: res.data.count,
  };
  return injectedValue;
};
