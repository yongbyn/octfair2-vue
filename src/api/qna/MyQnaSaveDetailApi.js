import axios from "axios";
import { Notice } from "../api";

export const MyQnaSaveDetailApi = async (formData) => {
  let bodyData = formData.value;

  await axios.post(Notice.InsertMyQnaDetail, bodyData);
};
