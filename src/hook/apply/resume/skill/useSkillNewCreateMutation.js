import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { skillNewCreateApi } from "../../../../api/apply/resume/skill/skillNewCreateApi";
import { toast } from "@/common/toastMessage";

export const useSkillNewCreateMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["skillCreate"],
    mutationFn: ({ resIdx, skill }) => {
      if (isValidSkill(skill)) return skillNewCreateApi(resIdx, skill);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["skillList"],
      });
    },
  });
};

const isValidSkill = (skill) => {
  let isValid = true;

  Object.entries(skill).some(([key, value]) => {
    if (!value || value.length <= 0) {
      toast.info("빈칸을 모두 채워주세요!!");
      document.getElementById(key)?.focus();
      isValid = false;
      return true; // 이 return값(true)는 'Object.values.some'반복문을 종료시킨다는 문법일뿐
    }
  });

  return isValid;
};
