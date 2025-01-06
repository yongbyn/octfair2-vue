import axios from "axios";
import { MyPage } from "../api";

export const updateUserApi = async (updateUserInfo) => {
  const { value } = updateUserInfo;
  const newUpdateUserInfo = {
    loginId: value.loginId.value,
    name: value.name.value,
    sex: value.sex,
    birthday: value.birthday.value,
    phone: value.phone,
    email: value.email,
    emailId: value.emailId.value,
    emailDomain: value.emailDomain.value,
    zipCode: value.zipCode,
    address: value.address,
    detailAddress: value.detailAddress,
  };
  const result = await axios.post(MyPage.UpdateUserInfo, newUpdateUserInfo);
  return result.data;
};
