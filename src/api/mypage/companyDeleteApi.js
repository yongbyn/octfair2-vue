import axios from "axios";
import { MyPage } from "../api";

export const companyDeleteApi = async (companySave, fileData) => {
  const result = await axios.post(MyPage.DeleteCompany, companySave.value);

  companySave.value = {
    bizName: {
      value: "",
      state: false,
    },
    bizCeoName: {
      value: "",
      state: false,
    },
    bizContact: "",
    bizAddr: {
      value: "",
      state: false,
    },
    bizEmpCount: {
      value: "",
      state: false,
    },
    bizWebUrl: {
      value: "",
      state: false,
    },
    bizFoundDate: {
      value: "",
      state: false,
    },
    bizRevenue: {
      value: "",
      state: false,
    },
    bizIntro: "",
  };

  fileData.value = {
    bizLogo: "",
    logicalPath: "",
  };
  return result.data;
};
