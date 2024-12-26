import axios from "axios";
import { Faq } from "../api";

export const faqListSearchApi = async (injectedValue, cPage, type) => {
  const reqType = "";
  if (type === "B") {
    reqType = "my";
  }

  const param = new URLSearchParams({
    ...injectedValue,
    currentPage: cPage,
    pageSize: 5,
    faq_type: type,
  });
  const result = await axios.post(Faq.SearchFaqList, param);

  return result.data;
};
