import { defineStore } from "pinia";
export const useGeneralStore = defineStore("general", {
  state: () => ({
    // estado tipo Number
    width: 0,
    height: 0,
    loading: false,
  }),
  // getters: {
  //   loading: (state) => !state.loading,
  // },

  actions: {
    update(data: any) {
      this.width = data.width;
      this.height = data.height;
    },
    changeLoading(data: boolean) {
      this.loading = data;
    },
  },
});
