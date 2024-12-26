import axios from "axios";
import { Faq } from "../api";

export const faqDetailInsertApi = async (detailValue, loginId) => {
  const textData = {
    title: detailValue.title,
    context: detailValue.content,
    loginId: loginId,
  };

  await axios.post(Faq.InsertFaqDetail, textData);
};
