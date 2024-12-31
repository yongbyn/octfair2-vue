import { useMutation } from "@tanstack/vue-query";
import { resumeDetailCreateApi } from "../../../api/apply/resume/resumeDetailCreateApi";
import { useModalStore } from "../../../stores/modalState";
import { useRouter } from "vue-router";

export const useResumeDetailCreateMutation = () => {
  const resIdx = ref("");
  const modalStore = useModalStore();
  const router = useRouter();

  return useMutation({
    mutationKey: ["resumeDetail"],
    mutationFn: () => resumeDetailCreateApi(resIdx),
    onSuccess: () => {
      modalStore.modalState = false;
      router.push("/vue/apply/resume-detail.do?resIdx=" + resIdx.value);
    },
  });
};
