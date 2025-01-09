import axios from "axios";
import { Company } from "../api";

export const companyDetailSearchApi = async (bizIdx) => {
  const result = await axios.post(Company.SearchCompanyDetail, {
    bizIdx,
  });
  return result.data.payload;
};
