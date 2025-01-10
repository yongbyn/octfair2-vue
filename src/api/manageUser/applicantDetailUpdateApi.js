import { toast } from "@/common/toastMessage";
import axios from "axios";
import { Applicant } from "../api";

export const applicantDetailUpdateApi = async (detailValue, loginId) => {
  const requestBody = {
    ...detailValue,
    loginId,
  };

  await axios.post(Applicant.UpdateApplicantDetail, requestBody).then((res) => {
    if (res.data.result === "success") {
      return;
    } else {
      toast.error("다시 시도해주세요.");
    }
  });
};
