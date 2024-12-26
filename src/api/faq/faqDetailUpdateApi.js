import axios from "axios";
import { Faq } from "../api";

export const faqDetailUpdateApi = async (detailValue, faq_idx) => {
  const textData = {
    ...detailValue,
    faqSeq: faq_idx,
    context: detailValue.content,
  };

  await axios.post(Faq.UpdateFaqDetail, textData);
};
