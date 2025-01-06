import axios from "axios";
import { Faq } from "../api";

export const faqDetailUpdateApi = async (detailValue, faq_idx, faq_type) => {
  const textData = {
    ...detailValue,
    faqSeq: faq_idx,
    context: detailValue.content,
    faq_type: faq_type.value,
  };

  const formData = new FormData();

  formData.append(
    "text",
    new Blob([JSON.stringify(textData)], {
      type: "application/json",
    })
  );
  await axios.post(Faq.UpdateFaqDetail, formData);
};