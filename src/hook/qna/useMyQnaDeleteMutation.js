import { MyQnaDeleteDetailApi } from "../../api/qna/MyQnaDeleteDetailApi";
import { useMutation } from "@tanstack/vue-query";
import { useRouter } from "vue-router";
import { useQueryClient } from "@tanstack/vue-query";

export const useMyQnaDeleteMutation=(qnaIdx)=>{

    const router=useRouter();
    const queryClient=useQueryClient();

    return (
        useMutation({
            mutationKey:["myQnaDelete"],
            mutationFn:()=>MyQnaDeleteDetailApi(qnaIdx),
            onSuccess:()=>{
                sessionStorage.removeItem('qnaIdx');
                alert("해당 질문을 삭제하였습니다.")
                queryClient.invalidateQueries({
                    queryKey: ["qnaListData"],
                  });
             router.replace({
                name:"qna"
             })
            }
        })
    )


}