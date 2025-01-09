import axios from "axios";
import { Scrap } from "../api";

export const postDetailUnScrapApi = async (postIdx, sortDelete) => {
  await axios.post(Scrap.DeleteScrap, {
    postIdx: postIdx,
    sortDelete: sortDelete,
  });
};
