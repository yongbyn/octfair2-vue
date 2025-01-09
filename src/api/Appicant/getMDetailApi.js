import axios from "axios";
import { Applicant } from "../api";

export const getMDetailApi= async (postIdx,MDetail,choiceStatus,provideMDVal)=>{

    console.log("Md테일 최초 호출")
    let res = await axios.post(Applicant.ApplicantManagerGetId);
 
    MDetail.value.Md = [...res.data.MDetail];

    // postIdx.value = res.data.MDetail[0].postIdx;


    let hirProcessArr=new Array();
    let temporayryArr=new Array();
    res.data.MDetail.forEach((item) => {
        let i=0;
        let {hirProcess}=item
        //console.log(hirProcess)
         hirProcessArr = hirProcess.match(/[가-힣]+/g);

           });

           choiceStatus.value=hirProcessArr[0]
           console.log(choiceStatus.value)
           hirProcessArr.push("합격")
            hirProcessArr.push("탈락")



           MDetail.value.hirProcess = [...hirProcessArr];

           provideMDVal.value=hirProcessArr;

    postIdx.value = res.data.MDetail[0].postIdx;
    console.log(`postIdx.value:  ${postIdx.value} `)

    return res.data.MDetail;

}