import axios from "axios";
import { Faq } from "../api";

export const faqListSearchApi = async (injectedValue, cPage, type) => {
  const param = new URLSearchParams({
    ...injectedValue,
    currentPage: cPage,
    pageSize: 5,
    faq_type: type === "B" ? "2" : "1",
  }); //type을 나눠줌!
  const result = await axios.post(Faq.SearchFaqList, param);

  return result.data;
};
