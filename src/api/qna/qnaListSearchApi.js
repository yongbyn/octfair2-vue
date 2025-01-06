import axios from "axios";
import { Notice } from "../api";

export const qnaListSearchApi = async (cPage, injectedValue, type) => {
  console.log(`api cPage ${cPage.value}       type ${type}`);

  let reqType = "";
  if (type === "B") {
    reqType = "my";
  }

  const param = {
    currentPage: cPage.value.toString(),
    pageSize: "5",
    startSeq: "0",
    qna_type: type, //injectedValue.value.Type,
    requestType: injectedValue.value?.requestType || "",
    searchTitle: injectedValue.value?.searchTitle || "",
    searchStDate: injectedValue.value?.searchStDate || "",
    searchEdDate: injectedValue.value?.searchEdDate || "",
  };
  console.log(param);
  console.log(Notice.SearchQnaBoardList);
  const result = await axios.post(Notice.SearchQnaBoardList, param);

  // axios.post(/vue/api/board/qnaListBody.do + "?pageSize=5&startSeq=0"); // 1번째칸(API주소+URLquery) -> RequestParam
  // axios.post(/vue/api/board/qnaListBody.do, new URLSearchParams({ pageSize: 5, startSeq: 0 })); // 2번째칸(URLSearchParams) -> RequestParam
  // axios.post(/vue/api/board/qnaListBody.do, '', { params : { Headers : 페이지사이즈 등 관련정보 }}); // 3번째칸(Header) -> RequestParam
  // axios.post(/vue/api/board/qnaListBody.do, { pageSize: 5, startSeq: 0 }); // 2번째칸(JSON) -> RequestBody
  // axios.post(/vue/api/board/qnaListBody.do, '' , { params : { Body : 페이지사이즈 등 관련정보 }); // 3번째칸(Body) -> RequestBody

  return result.data;
};
