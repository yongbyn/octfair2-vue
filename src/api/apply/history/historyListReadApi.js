import { useUserInfo } from "../../../stores/userInfo";
import axios from "axios";
import { History } from "../../api";

export const historyListReadApi = async (
  itemPerPage,
  currentPage,
  injectedHistorySearchValue
) => {
  const userInfo = useUserInfo();

  const param = {
    loginId: userInfo.user.loginId,
    userNm: userInfo.user.userNm,
    userType: userInfo.user.userType,
    currentPage: currentPage.value.toString(),
    pageSize: itemPerPage.value.toString(),
    ...injectedHistorySearchValue.value,
  };

  const result = await axios.post(History.ReadHistoryList, param);
  return result.data;
};
