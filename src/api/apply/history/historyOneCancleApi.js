import axios from "axios";
import { History } from "../../api";

export const historyOneCancleApi = async (appId) => {
  const param = new URLSearchParams({ appId: appId });

  const result = await axios.post(History.CancleHistoryOne, param);
  return result.data;
};
