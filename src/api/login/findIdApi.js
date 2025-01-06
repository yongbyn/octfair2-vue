import axios from "axios";
import { Login } from "../api"; 

export const findIdApi = async (findIdUserInfo) => {
  const result = await axios.post(Login.FindId, findIdUserInfo.value);

  if (result.data.result === "SUCCESS") {
    findIdUserInfo.value.foundId = result.data.id;
  }

  return result.data;
};