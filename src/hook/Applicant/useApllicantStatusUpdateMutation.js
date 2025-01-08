import { updateApplicantStatusApi } from "../../api/Appicant/updateApplicantStatusApi";

import { useMutation ,useQueryClient} from "@tanstack/vue-query";
import { useRouter } from "vue-router";

export  const useApllicantStatusUpdateMutation=(keyword,postIdx,loginId)=>{

    const router=useRouter();
    const queryClient=useQueryClient();

    return (
        useMutation({
            mutationKey:["statusUpdate"],
            mutationFn: ()=>updateApplicantStatusApi(keyword,postIdx,loginId),
            enabled: false,
            onSuccess: () => {
                router.push({
                    name:"volunteer"
                })
                queryClient.invalidateQueries({
                  queryKey: ["applicantList"],
                });
              },
        })
    )


    
}  