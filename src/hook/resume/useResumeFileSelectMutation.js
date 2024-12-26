import { useMutation } from "@tanstack/vue-query";

export const useResumeFileSelectMutation = (fileData) => {
  return useMutation({
    mutationKey: ["resumeFile"],
    mutationFn: (e) => {
      console.log("e? " + e);
      console.log("0? " + e.target.files[0]);
      fileData.value = e.target.files[0];
      console.log("fd? " + fileData);
      console.log("fdv? " + fileData.value);
    },
    onSuccess: () => {},
  });
};
