import axios from "axios";
import { Notice } from "../api";

export const noticeDetailSearchApi = async (detailValue, idx, fileData) => {
  const result = await axios.post(Notice.NoticeDetail, {
    noticeSeq: idx,
  });
  return result.data;
};
