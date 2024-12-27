import { Resume } from "../api";
import axios from "axios";

export const resumeImageDownApi = async (idx, fileName) => {
  const param = { resIdx: idx };

  const result = await axios.post(Resume.DownResumeImage, param, {
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
