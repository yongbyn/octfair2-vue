import { useModalStore } from "@/stores/modalState";
import axios from "axios";
import { Login } from "../api";

export const signUpApi = async (signUpUserInfo) => {
  const modalStore = useModalStore();
  const { value } = signUpUserInfo;
  const newSignUpUserInfo = {
    action: value.action,
    userType: value.userType,
    loginId: value.loginId.value,
    password: value.password.value,
    passwordCk: value.passwordCk.value,
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
  }
  const result = await axios.post(Login.SignUp, newSignUpUserInfo);

  modalStore.setModalState();

  return result.data;
};
