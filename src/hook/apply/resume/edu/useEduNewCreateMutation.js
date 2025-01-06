import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { eduNewCreateApi } from "../../../../api/apply/resume/edu/eduNewCreateApi";
import { toast } from "@/common/toastMessage";

export const useEduNewCreateMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["eduCreate"],
    mutationFn: ({ resIdx, edu }) => {
      if (isValidEdu(edu)) return eduNewCreateApi(resIdx, edu);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["eduList"],
      });
    },
  });
};

const isValidEdu = (edu) => {
  let isValid = true;

  Object.entries(edu).some(([key, value]) => {
    if (!value || value.length <= 0) {
      toast.info("빈칸을 모두 채워주세요!!");
      document.getElementById(key)?.focus();
      isValid = false;
      return true; // 이 return값(true)는 'Object.values.some'반복문을 종료시킨다는 문법일뿐
    }

    if (key == "admDate" && new Date(value) > new Date(edu.grdDate)) {
      toast.info("입학일은 졸업일보다 나중일 수 없습니다.");
      document.getElementById(key)?.focus();
      isValid = false;
      return true;
    }

    if (key == "grdDate" && new Date(value) > new Date()) {
      toast.info("졸업일은 오늘보다 나중일 수 없습니다.");
      document.getElementById(key)?.focus();
      isValid = false;
      return true;
    }
  });

  return isValid;
};
