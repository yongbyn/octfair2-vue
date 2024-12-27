import axios from "axios";
import { Resume } from "../api";

export const resumeDetailReadApi = async (resIdx, resume) => {
  const param = { resIdx: resIdx.value };

  let result;
  if (resIdx.value) {
    result = await axios.post(Resume.ReadResumeDetail, param);
    resume.value.resTitle = result.data.payload.resTitle;
    resume.value.shortIntro = result.data.payload.shortIntro;
    resume.value.pfoLink = result.data.payload.proLink; // Spring Mapper 오타
    resume.value.perStatement = result.data.payload.perStatement;
    resume.value.logicalPath = result.data.payload.logicalPath;
  }
  return result.data;
};
