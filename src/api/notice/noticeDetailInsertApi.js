import axios from "axios";
import { Notice } from "../api";

export const noticeDetailInsertApi = async (detailValue, loginId) => {
  const textData = {
    title: detailValue.title,
    context: detailValue.content,
    loginId: loginId,
  };

  const fileData = ref("");
  const formData = new FormData();
  if (fileData.value) formData.append("file", fileData.value);
  formData.append(
    "text",
    new Blob([JSON.stringify(textData)], {
      type: "application/json",
    })
  );

  await axios.post(Notice.FileNoticeDetail, formData);
};
