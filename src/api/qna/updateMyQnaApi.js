import axios from "axios";
import { Notice } from "../api";

export const updateMyQnaApi = async (formData) => {
  let bodyData = formData.value;

  await axios.post(Notice.UpdateMyQnaDetail, bodyData);
};
