import axios from "axios";
import { Resume } from "../api";

export const resumeImageDownApi = async (idx, fileName) => {
  const result = await axios.post(Resume.DownResumeImage, { resIdx: idx });
  alert(idx);
  alert(fileName);
  const url = window.URL.createObjectURL(new Blob([result.data]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "팝콘.jpg");
  document.body.appendChild(link);
  link.click();
  link.remove();
};
