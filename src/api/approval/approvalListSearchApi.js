import axios from "axios";
import { Approval } from "../api";

export const approvalListSearchApi = async (injectedValue, cPage) => {
  const param = new URLSearchParams({
    ...injectedValue,
    currentPage: cPage,
    pageSize: 5,
  });
  const result = await axios.post(Approval.SearchApprovalList, param);

  return result.data;
};
