import axios from "axios";
import { Faq } from "../api";

export const faqDetailSearchApi = async (detailValue, faq_idx) => {
  const result = await axios.post(Faq.SearchFaqDetail, {
    faqSeq: faq_idx.value,
    ...detailValue.value,
  });
  return result.data;
};
