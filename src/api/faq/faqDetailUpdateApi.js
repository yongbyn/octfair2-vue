import axios from "axios";
import { Faq } from "../api";

export const faqDetailUpdateApi = async (detailValue, faq_idx) => {
  // textData 객체 생성


  const textData = {
    ...detailValue.value,
    faqSeq: faq_idx.value,
    context: detailValue.value.content,
    faq_type: detailValue.faq_type,
  };

  const formData = new FormData();

  // JSON 객체를 Blob 형태로 변환 후 FormData에 추가
  formData.append(
    "text",
    new Blob([JSON.stringify(textData)], {
      type: "application/json"
    })
  );
  await axios.post(Faq.UpdateFaqDetail, formData);
};
