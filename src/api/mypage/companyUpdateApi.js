import axios from "axios";
import { MyPage } from "../api";

export const companyUpdateApi = async (companySave, fileData) => {
  const formData = new FormData();

  const textData = {
    bizName: companySave.value.bizName.value,
    bizCeoName: companySave.value.bizCeoName.value,
    bizContact: companySave.value.bizContact,
    bizAddr: companySave.value.bizAddr.value,
    bizEmpCount: companySave.value.bizEmpCount.value,
    bizWebUrl: companySave.value.bizWebUrl.value,
    bizFoundDate: companySave.value.bizFoundDate.value,
    bizRevenue: companySave.value.bizRevenue.value,
    bizIntro: companySave.value.bizIntro,
    userIdx: companySave.value.userIdx,
  };

  Object.entries(textData).forEach(([key, value]) => {
    formData.append(key, value);
  });
  if (fileData) {
    formData.append("fileInfo", fileData.value);
  }
  const result = await axios.post(MyPage.CompanyUpdate, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return result.data;
};
