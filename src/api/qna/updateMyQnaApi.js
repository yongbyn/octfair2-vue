import { Notice } from "../api";
import axios from "axios";


export const updateMyQnaApi= async( formData)=>{

let bodyData=formData.value;

console.log(bodyData)

await axios.post(Notice.UpdateMyQnaDetail,bodyData);

}
