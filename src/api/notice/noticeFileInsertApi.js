import axios from "axios";
import { Notice } from "../api";
export const noticeFileInsertApi = async (detailValue, idx) => {
  const textData = {
    ...detailValue,
    noticeSeq: idx,
    context: detailValue.content,
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

  await axios.post(Notice.InsertNoticeDetail, formData);
};
