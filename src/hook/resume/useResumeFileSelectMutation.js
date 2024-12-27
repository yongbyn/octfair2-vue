import { useMutation } from "@tanstack/vue-query";

export const useResumeFileSelectMutation = (fileData) => {
  return useMutation({
    mutationKey: ["resumeFile"],
    mutationFn: (e) => {
      fileData.value = e.target.files[0];
    },
    onSuccess: () => {},
  });
};
