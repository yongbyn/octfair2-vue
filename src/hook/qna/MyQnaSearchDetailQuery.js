
import { useQuery } from "@tanstack/vue-query";
import { MyQnaSearchDetailApi } from "../../api/qna/MyQnaSearchDetailApi";

export const MyQnaSearchDetailQuery=(qnaIdx)=>{


    return(
        useQuery({
            queryKey:['myQnadetail'],
            queryFn:()=>MyQnaSearchDetailApi(qnaIdx)

        })
    )


}