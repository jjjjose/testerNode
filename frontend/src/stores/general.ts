import { defineStore } from "pinia";
import { NumberFormat } from "vue-i18n";

export const useGeneralStore = defineStore("general", {
  state: () => ({
    // estado tipo Number
    width: 0,
    height: 0,
  }),

  actions: {
    update(data: any) {
      this.width = data.width;
      this.height = data.height;
    },
  },
});
