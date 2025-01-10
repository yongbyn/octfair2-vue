import axios from "axios";

import { Notice } from "../api";

import { paginCalCulFnc } from "./../../JavaScriptutil/pagingUtil";
export const qnaListSearchApi = async (
  paginData,
  injectedValue,
  qnaList,
  startIndex
) => {
  //되는 코드 13~14
  // const result = await axios.post(Notice.SearchQnaBoardList, paginData);
  // return result.data;

  if (injectedValue === "my") {
    paginData.requestType = injectedValue;
  }

  if (injectedValue === "M") {
    paginData.qna_type = injectedValue;
  }

  const result = await axios.post(Notice.SearchQnaBoardList, paginData);

  let paginCalCulData = paginCalCulFnc(
    paginData.currentPage,
    result.data.qnaCnt,
    5,
    5
  );

  result.paginCalCulData = paginCalCulData;

  return result;
};
