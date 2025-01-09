import axios from "axios";
import { useUserInfo } from "../../../stores/userInfo";
import { History } from "../../api";

export const historyListReadApi = async (
  itemPerPage,
  currentPage,
  injectedHistorySearchValue
) => {
  const userInfo = useUserInfo();

  const param = {
    ...injectedHistorySearchValue.value,
    loginId: userInfo.user.loginId,
    userNm: userInfo.user.userNm,
    userType: userInfo.user.userType,
    currentPage: currentPage.value.toString(),
    pageSize: itemPerPage.value.toString(),
    startDate: formatDate(new Date(), injectedHistorySearchValue.value.period),
  };

  const result = await axios.post(History.ReadHistoryList, param);
  return result.data;
};

// period로 startDate를 계산
const formatDate = (today, period) => {
  if (!period) return "";

  let startDate = new Date();

  const calcStartDate = {
    "1week": () => startDate.setDate(today.getDate() - 7),
    "1month": () => startDate.setMonth(today.getMonth() - 1),
    "2month": () => startDate.setMonth(today.getMonth() - 2),
    "3month": () => startDate.setMonth(today.getMonth() - 3),
    "6month": () => startDate.setMonth(today.getMonth() - 6),
    "1year": () => startDate.setFullYear(today.getFullYear() - 1),
  };

  calcStartDate[period]();
  return `${startDate.getFullYear()}-${String(startDate.getMonth() + 1).padStart(2, "0")}-${String(startDate.getDate()).padStart(2, "0")}`;
};
