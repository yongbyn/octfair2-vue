import { toast } from "@/common/toastMessage";
import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { applicantDetailUpdateApi } from "../../api/manageUser/applicantDetailUpdateApi";

export const useApplicantDetailUpdateMutation = (
  detailValue,
  loginId,
  modalState
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["applicantUpdate"],
    mutationFn: async () => {
      await applicantDetailUpdateApi(detailValue, loginId);
    },
    onSuccess: () => {
      toast.info("수정이 완료되었습니다.");
      modalState.setModalState();
      queryClient.invalidateQueries({
        queryKey: ["applicantList"],
      });
    },
    onError: () => {
      toast.error("데이터를 불러오는 중입니다. 다시 시도해주세요.");
      modalState.setModalState();
    },
  });
};
