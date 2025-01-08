import { Notice } from "../api";
import axios from "axios";


export const MyQnaDeleteDetailApi= async (qnaIdx)=>{

    let bodyData={
        qnaSeq:qnaIdx
    }
    await axios.post(Notice.DeleteMyQnaDetail,bodyData)

}

