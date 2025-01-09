import axios from "axios";
import { Scrap } from "../api";

export const postDetailDoScrapApi = async (postIdx) => {
  await axios.post(Scrap.UpdateScrap, {
    postIdx: postIdx,
  });
};
