import axios from "axios";
import { Faq } from "../api";

export const faqDetailInsertApi = async (detailValue, faq_idx, loginId) => {
  const textData = {
    title: detailValue.value.title,
    context: detailValue.value.content,
    author: detailValue.author,
    loginId: loginId,
    faq_type: detailValue.value.faq_type,
  };

  const formData = new FormData();

  formData.append(
    "text",
    new Blob([JSON.stringify(textData)], {
      type: "application/json",
    })
  );
  await axios.post(Faq.InsertFaqDetail, formData);
};
