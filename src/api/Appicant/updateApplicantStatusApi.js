import axios from "axios";
import { Applicant } from "../api";

export const updateApplicantStatusApi= async (keyword,postIdx,loginId)=>{

let bodyData={
    keyword:keyword.value,
    postIdx:postIdx.value,
    loginId:loginId.value
}

console.log(bodyData)
///prx/api/manage-hire/statusUpdate.do
let res= await axios.post(Applicant.ApplicantStatusUpdate,bodyData)

console.log(res.data)

keyword.value=''
postIdx.value=''
loginId.value=''



}