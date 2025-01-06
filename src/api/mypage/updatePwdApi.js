import axios from "axios";
import { MyPage } from "../api";

export const updatePwdApi = async (updatePwd) => {
    const result = await axios.post(MyPage.UpdatePwd, updatePwd.value);

    if(result.data === "success"){
        alert("성공");
    } else {
        alert("실패");
    }

    return result.data;
};
