import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { careerNewCreateApi } from "../../../../api/apply/resume/career/careerNewCreateApi";
import { toast } from "@/common/toastMessage";

export const useCareerNewCreateMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["careerCreate"],
    mutationFn: ({ resIdx, career }) => {
      if (isValidCareer(career)) return careerNewCreateApi(resIdx, career);
    },
    onSuccess: (response) => {
      console.log(response);
      if ("SUCCESS".toUpperCase() === response.result.toUpperCase()) {
        career.value = {
          ...{
            startDate: "",
            company: "",
            dept: "",
            endDate: "",
            position: "",
            reason: "",
            crrDesc: "",
          },
        };
      }

      queryClient.invalidateQueries({
        queryKey: ["careerList"],
      });
    },
  });
};

const isValidCareer = (career) => {
  let isValid = true;

  Object.entries(career).some(([key, value]) => {
    if (!value || value.length <= 0) {
      toast.info("빈칸을 모두 채워주세요!!");
      document.getElementById(key)?.focus();
      isValid = false;
      return true; // 이 return값(true)는 'Object.values.some'반복문을 종료시킨다는 문법일뿐
    }

    if (key == "startDate" && new Date(value) > new Date(career.endDate)) {
      toast.info("입사일은 퇴사일보다 나중일 수 없습니다.");
      document.getElementById(key)?.focus();
      isValid = false;
      return true;
    }

    if (key == "endDate" && new Date(value) > new Date()) {
      toast.info("퇴사일은 오늘보다 나중일 수 없습니다.");
      document.getElementById(key)?.focus();
      isValid = false;
      return true;
    }
  });

  return isValid;
};
