import { Resume } from "../api";
import axios from "axios";

export const resumeFileDownApi = async (resIdx, fileName) => {
  const param = { resIdx: resIdx };

  const result = await axios.post(Resume.DownResumeFile, param, {
    responseType: "blob",
  });

  const url = window.URL.createObjectURL(new Blob([result.data]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", fileName);
  document.body.appendChild(link);
  link.click();
  link.remove();
};
