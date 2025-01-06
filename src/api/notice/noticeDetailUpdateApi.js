import axios from "axios";
import { Notice } from "../api";

export const noticeDetailUpdateApi = async (detailValue, idx) => {
  const textData = {
    ...detailValue,
    noticeSeq: idx,
    context: detailValue.content,
  };

  const formData = new FormData();
  const fileData = ref("");
  if (fileData.value) formData.append("file", fileData.value);
  formData.append(
    "text",
    new Blob([JSON.stringify(textData)], {
      type: "application/json",
    })
  );

  await axios.post(Notice.FileNoticeUpdate, formData);
};
