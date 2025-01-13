import axios from "axios";
import { MyPage } from "../api";

export const getCompanyInfoApi = async (companySave, fileData) => {
  const result = await axios.post(MyPage.GetCompanyInfo, companySave.value);
  const data = result.data.payload;

  companySave.value = {
    bizName: {
      value: data.bizName,
      state: true,
    },
    bizCeoName: {
      value: data.bizCeoName,
      state: true,
    },
    bizContact: data.bizContact,
    bizAddr: {
      value: data.bizAddr,
      state: true,
    },
    bizEmpCount: {
      value: data.bizEmpCount,
      state: true,
    },
    bizWebUrl: {
      value: data.bizWebUrl,
      state: true,
    },
    bizFoundDate: {
      value: data.bizFoundDate,
      state: true,
    },
    bizRevenue: {
      value: data.bizRevenue,
      state: true,
    },
    bizIntro: data.bizIntro,
    bizLogo: data.logoUrl,
    bizIdx: data.bizIdx,
  };
  fileData.value = {
    bizLogo: data.bizLogo,
    logicalPath: data.logicalPath,
  };

  return result.data;
};
