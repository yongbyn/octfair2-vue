import { MyQnaSaveDetailApi } from "../../api/qna/MyQnaSaveDetailApi";
import { useMutation } from "@tanstack/vue-query";
import { useRouter } from "vue-router";
import { useQueryClient } from "@tanstack/vue-query";

export const useMyqQnaSaveDetailMutation=(formData)=>{


    const router=useRouter();
    const queryClient=useQueryClient();


    return(
        useMutation({
            mutationKey:["saveMyQna"],
            mutationFn:()=>MyQnaSaveDetailApi(formData),
            onSuccess:()=>{
                alert("질문작성을 완료하였습니다.")
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
