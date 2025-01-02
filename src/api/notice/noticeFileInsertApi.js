/* import axios from "axios";

export const noticeFileInsertApi = async (detailValue, idx) => {
  const textData = {
    ...detailValue,
    noticeSeq: idx,
    context: detailValue.content,
  };
  const fileData = ();
  const formData = new FormData();
  if (fileData.value) formData.append("file", fileData.value);
  formData.append(
    "text",
    new Blob([JSON.stringify(textData)], {
      type: "application/json",
    })
  );

  await axios.post("/api/board/noticeSaveFileForm.do", formData).then((res) => {
    if (res.data.result === "success") {
      modalState.setModalState();
      emit("postSuccess");
    }
  });
}; */
