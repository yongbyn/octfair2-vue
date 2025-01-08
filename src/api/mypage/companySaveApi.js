import axios from "axios";
import { MyPage } from "../api";

export const companySaveApi = async (companySave, fileData) => {
  const formData = new FormData();

  const textData = {
    bizName: companySave.value.bizName.value,
    bizCeoName: companySave.value.bizCeoName.value,
    bizAddr: companySave.value.bizAddr.value,
    bizContact: companySave.value.bizContact,
    bizWebUrl: companySave.value.bizWebUrl.value,
    bizFoundDate: companySave.value.bizFoundDate.value,
    bizEmpCount: companySave.value.bizEmpCount.value,
    bizRevenue: companySave.value.bizRevenue.value,
    bizIntro: companySave.value.bizIntro,
  };
  Object.entries(textData).forEach(([key, value]) => {
    formData.append(key, value);
  });
  if (fileData) {
    formData.append("fileInfo", fileData.value);
  }

  const result = await axios.post(MyPage.CompanySave, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  if (result.data.result === "success") {
    alert("성공");
  } else {
    alert("실패");
  }

  return result.data;
};
