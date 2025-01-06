import axios from "axios";
import { Faq } from "../api";

export const faqDetailDeleteApi = async (faq_idx) => {
  await axios.post(Faq.DeleteFaqDetail, { faqSeq: faq_idx });
};
