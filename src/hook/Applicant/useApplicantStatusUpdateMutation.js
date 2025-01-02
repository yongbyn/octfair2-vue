
import { ApplicantStatusUpdateApi } from "../../api/Appicant/ApplicantStatusUpdateApi";
import { useMutation } from "@tanstack/vue-query";

export const useApplicantStatusUpdateMutation=(choiceStatus)=>{


    return(useMutation(
        {
mutationKey:["statusUpdate"],
mutationFn:()=>ApplicantStatusUpdateApi(choiceStatus)
            
        }
    ))

}
