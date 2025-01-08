import axios from "axios";
import { MyPage } from "../api";

export const getCompanyInfoApi = async (companySave, fileData) => {
    const result = await axios.post(MyPage.GetCompanyInfo, companySave.value);

    const data = result.data

    companySave.value = {
        bizName: { value: data.bizName || "", state: !!data.bizName },
        bizCeoName: { value: data.bizCeoName || "", state: !!data.bizCeoName },
        bizContact: { value: data.bizContact || "", state: !!data.bizContact },
        bizAddr: { value: data.bizAddr || "", state: !!data.bizAddr },
        bizEmpCount: { value: data.bizEmpCount || "", state: !!data.bizEmpCount },
        bizWebUrl: { value: data.bizWebUrl || "", state: !!data.bizWebUrl },
        bizFoundDate: { value: data.bizFoundDate || "", state: !!data.bizFoundDate },
        bizRevenue: { value: data.bizRevenue || "", state: !!data.bizRevenue },
        bizIntro: { value: data.bizIntro || "", state: !!data.bizIntro },
        userIdx: { value: user.userIdx, state: true },
        bizLogo: { value: data.logoUrl || "", state: !!data.logoUrl },
    };
    
    fileData.value = data.logoUrl || '';
    logoPreview.value = data.logoUrl || '';

    console.log(companySave.value);

    return result.data;
};
