import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { certNewCreateApi } from "../../../../api/apply/resume/cert/certNewCreateApi";
import { toast } from "@/common/toastMessage";

export const useCertNewCreateMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["certCreate"],
    mutationFn: ({ resIdx, cert }) => {
      if (isValidCert(cert)) return certNewCreateApi(resIdx, cert);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["certList"],
      });
    },
  });
};

const isValidCert = (cert) => {
  let isValid = true;

  Object.entries(cert).some(([key, value]) => {
    if (!value || value.length <= 0) {
      toast.info("빈칸을 모두 채워주세요!!");
      document.getElementById(key)?.focus();
      isValid = false;
      return true; // 이 return값(true)는 'Object.values.some'반복문을 종료시킨다는 문법일뿐
    }

    if (key == "acqDate" && new Date(value) > new Date()) {
      toast.info("취득일은 오늘보다 나중일 수 없습니다.");
      document.getElementById(key)?.focus();
      isValid = false;
      return true;
    }
  });

  return isValid;
};
