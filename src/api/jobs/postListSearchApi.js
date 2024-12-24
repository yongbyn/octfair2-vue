import axios from "axios";
import { Post } from "../api";

export const postListSearchApi = async (injectedValue, cPage) => {
  const param = new URLSearchParams({
    ...injectedValue,
    currentPage: cPage,
    pageSize: 5,
  });
  const result = await axios.post(Post.SearchPostList, param);

  return result.data;
};
