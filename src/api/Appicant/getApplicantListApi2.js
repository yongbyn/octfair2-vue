import axios from "axios";
import { Applicant } from "../api";

export const getApplicantListApi2= async (postIdx,pageSetting,choiceStatus,injectedValue)=>{
console.log(`postIdx:  ${postIdx.value}`)

console.log("choiceStatus:  "+choiceStatus.value)
//console.log(injectedValue)

    let bodyData = {
      postIdx: postIdx.value.toString(),
      firstProc:choiceStatus.value,
      keyword: choiceStatus.value,
      currentPage: pageSetting.value.currentPage.toString(),
      pageSize: pageSetting.value.pageSize.toString(),
    };  
    console.log(bodyData)
    let res = await axios.post(Applicant.ApllicantList, bodyData);
 
  
   
    injectedValue.value={
    list:res.data.list,
    count:res.data.count
    };

    console.log(injectedValue)
    return res.data.list
  


}