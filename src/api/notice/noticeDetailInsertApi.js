import { useUserInfo } from "@/stores/userInfo";
import axios from "axios";
import { Notice } from "../api";

export const noticeDetailInsertApi = async (detailValue, idx, fileData) => {
  const userInfo = useUserInfo();

  const textData = {
    title: detailValue.title,
    context: detailValue.content,
    loginId: userInfo.user.loginId,
    ...detailValue.value,
  };

  const formData = new FormData();
  if (fileData.value) formData.append("file", fileData.value);
  formData.append(
    "text",
    new Blob([JSON.stringify(textData)], { type: "application/json" })
  );

  await axios.post(Notice.InsertNoticeDetail, formData);
};
