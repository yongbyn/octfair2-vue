import axios from "axios";
import { Notice } from "../api";

export const noticeDetailSearchApi = async (detailValue, idx, fileData) => {
  if (idx.value) {
    const result = await axios.post(Notice.NoticeDetail, {
      noticeSeq: idx.value,
      title: detailValue.title,
      context: detailValue.value.content,
      ...detailValue.value,
    });
    if (!fileData || !fileData.value) {
      delete result.data.fileName;
    } else {
      result.data.fileName = fileData.value.name;
    }
    return result.data;
  }
};
