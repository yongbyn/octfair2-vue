import axios from "axios";
import { Faq } from "../api";

export const faqDetailInsertApi = async (detailValue, faq_type, loginId) => {
  const textData = {
    title: detailValue.title,
    context: detailValue.content,
    author: detailValue.author,
    loginId: loginId,
    faq_type: faq_type.value,
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