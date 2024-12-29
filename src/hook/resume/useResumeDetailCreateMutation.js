import { useMutation } from "@tanstack/vue-query";
import { useRouter } from "vue-router";
import { resumeDetailCreateApi } from "../../api/resume/resumeDetailCreateApi";
import { useModalStore } from "../../stores/modalState";

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
