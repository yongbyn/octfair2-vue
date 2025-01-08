import axios from "axios";
import { Notice } from "../api";

export const noticeDetailInsertApi = async (detailValue, loginId, fileData) => {
  const textData = {
    title: detailValue.title,
    context: detailValue.content,
    loginId: loginId,
  };

  const formData = new FormData();
  if (fileData?.value) {
    formData.append("file", fileData.value);
  }
  formData.append(
    "text",
    new Blob([JSON.stringify(textData)], {
      type: "application/json",
    })
  );
  const response = await axios.post(Notice.InsertNoticeDetail, formData);

  return response.data;
};
