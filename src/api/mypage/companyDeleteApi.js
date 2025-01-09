import axios from "axios";
import { MyPage } from "../api";

export const companyDeleteApi = async (companySave) => {
  const result = await axios.post(MyPage.DeleteCompany, companySave.value);

  return result.data;
};
