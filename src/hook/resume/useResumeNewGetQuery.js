import { useQuery } from "@tanstack/vue-query";
import { resumeNewGetApi } from "../../api/resume/resumeNewGetApi";

export const useResumeNewGetQuery = (isCreated, resIdx) => {
  return useQuery({
    enabled: !isCreated.value, // refetchInterval: false로도 useQuery자동갱신과 spring자동저장 시너지를 막을 수 없어 isCreated 사용용
    queryKey: ["resumeNew"],
    queryFn: () => resumeNewGetApi(isCreated, resIdx),
  });
};
