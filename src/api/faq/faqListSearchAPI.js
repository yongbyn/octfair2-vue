import axios from "axios";
import { Faq } from "../api";

export const faqListSearchApi = async (injectedValue, cPage) => {
  const param = new URLSearchParams({
    ...injectedValue,
    currentPage: cPage,
    pageSize: 5,
  });
  const result = await axios.post(Faq.SearchFaqList, param);

  return result.data;
};
