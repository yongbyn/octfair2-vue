import axios from "axios";
import { MyPage } from "../api";

export const getUserInfoApi = async (user, updateUserInfo) => {
  const result = await axios.post(MyPage.GetUserInfo, user);

  const email = result.data.detail.email;
  const [emailId, emailDomain] = email.split("@");

  updateUserInfo.value = {
    loginId: result.data.detail.loginId,
    userType: result.data.detail.userType,
    name: {
      value: result.data.detail.name,
      state: true,
    },
    sex: result.data.detail.sex,
    birthday: {
      value: result.data.detail.birthday,
      state: true,
    },
    phone: result.data.detail.phone,
    email: result.data.detail.email,
    emailId: {
      value: emailId,
      state: true,
    },
    emailDomain: {
      value: emailDomain,
      state: true,
    },
    zipCode: result.data.detail.zipCode,
    address: result.data.detail.address,
    detailAddress: result.data.detail.detailAddress,
  };

  return result.data;
};
