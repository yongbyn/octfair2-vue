import axios from "axios";
import { Faq } from "../api";

export const faqDetailSearchApi = async (params) => {
  const result = await axios.post(Faq.SearchFaqDetail, {
    faqSeq: params.faq_idx,
  });
  return result.data;
};