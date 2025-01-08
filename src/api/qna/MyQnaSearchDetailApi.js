import axios from "axios";
import { Notice } from "../api";


export const MyQnaSearchDetailApi= async (qnaIdx)=>{

console.log(`qnaIdx:  ${qnaIdx}`)
    let bodyData={qnaSeq:qnaIdx}
    let res=await axios.post(Notice.SearchMyQnaDetail,bodyData)

    return res.data.detail;

}


