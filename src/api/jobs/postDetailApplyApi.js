import axios from "axios";
import { Post } from "../api";

export const postDetailApplyApi = async (resumeIdx, postIdx, onSuccess) => {
  await axios
    .post(Post.UpdatePostApply, {
      resumeIdx: resumeIdx,
      postIdx: postIdx,
    })
    .then((res) => {
      if (res.data.result === "fail") {
        alert(res.data.message);
      } else {
        alert("지원 완료되었습니다.");
        if (onSuccess) onSuccess();
      }
    });
};
