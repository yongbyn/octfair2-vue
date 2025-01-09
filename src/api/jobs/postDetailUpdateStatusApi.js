import axios from "axios";
import { Post } from "../api";

export const postDetailUpdateStatusApi = async (postIdx, appStatus) => {
  await axios.post(Post.UpdatePostDetailStatus, {
    postIdx: postIdx,
    appStatus: appStatus,
  });
};
