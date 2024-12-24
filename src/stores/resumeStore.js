import { defineStore } from "pinia";

export const useResumeStore = defineStore("resume", {
  state: () => ({
    resIdx: null,
  }),
  actions: {
    setResIdx(value) {
      this.resIdx = value;
    },
  },
});
