import { toast } from "@/common/toastMessage";
import axios from "axios";
import { Biz } from "../api";

export const bizDetailUpdateApi = async (detailValue, bizidx) => {
  const requestBody = {
    ...detailValue,
    bizidx,
  };

  await axios.post(Biz.UpdateBizDetail, requestBody).then((res) => {
    if (res.data.result === "success") {
      return;
    } else {
      toast.error("다시 시도해주세요.");
    }
  });
};
