import axios from "axios";
import { Applicant } from "../api";

export const getApplicantPaginApi = async (injectedValue, cPage) => {
  let bodyData = {
    postIdx: injectedValue.value.list[0].postIdx.toString(),
    firstProc: "서류심사중",
    keyword: injectedValue.value.list[0].status.toString(),
    currentPage: cPage.value.toString(),
    pageSize: "5",
  };

  if (bodyData.keyword.indexOf("탈락") != -1) {
    bodyData.keyword = "탈락";
  }

  let res = await axios.post(Applicant.ApllicantList, bodyData);
  injectedValue.value = {
    list: res.data.list,
    count: res.data.count,
  };
  return res.data.list;
};
