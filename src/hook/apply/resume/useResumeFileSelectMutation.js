import { useMutation } from "@tanstack/vue-query";

export const useResumeFileSelectMutation = (fileData, fileImgSrc) => {
  return useMutation({
    mutationKey: ["resumeFile"],
    mutationFn: (e) => {
      fileData.value = e.target.files[0];

      if (fileData.value.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = () => (fileImgSrc.value = reader.result);
        reader.readAsDataURL(fileData.value); // 파일 읽기 시작
      } else {
        fileImgSrc.value = null; // 파일 선택 안 했을 경우 초기화
      }
    },
    onSuccess: () => {},
  });
};
