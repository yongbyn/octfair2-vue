import { useModalStore } from "@/stores/modalState";
import axios from "axios";
import { Login } from "../api";

export const signUpApi = async (useUserInfo) => {
  const modalStore = useModalStore();
  const result = await axios.post(Login.SignUp, useUserInfo.value);

  modalStore.setModalState();

  return result.data;
};
