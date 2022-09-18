<template>
  <div>
    <q-table
      dense
      class="my-sticky-virtscroll-table"
      virtual-scroll
      v-model:pagination="pagination"
      :rows-per-page-options="[0]"
      :virtual-scroll-sticky-size-start="48"
      row-key="index"
      title="Escaneo de Subdominios"
      :rows="subdomainsStore.subdomains"
      :columns="columns"
      :loading="generalStore.loading"
    />
  </div>
</template>
<script setup lang="ts">
import { useGeneralStore } from "src/stores/general";
import { ref } from "vue";
import { useSubdomainsStore } from "../../stores/subdomains";
const subdomainsStore = useSubdomainsStore();
const generalStore = useGeneralStore();
let rows: any = ref([]);
// rows = subdomainsStore.subdomains;
// const initialPagination = {
//   sortBy: "desc",
//   descending: false,
//   page: 2,
//   rowsPerPage: 3,
//   // rowsNumber: xx if getting data from a server
// };
const columns: any = [
  {
    name: "index",
    align: "left",
    label: "#",
    field: "id",
  },
  { name: "Subdominio", label: "Subdominio", field: "subdomain" },
];

const pagination = ref({
  rowsPerPage: 0,
});
</script>
<style lang="sass">
.my-sticky-virtscroll-table
  /* height or max-height is important */
  height: 300px

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th /* bg color is important for th; just specify one */
    background-color: #fff

  thead tr th
    position: sticky
    z-index: 1
  /* this will be the loading indicator */
  thead tr:last-child th
    /* height of all previous header rows */
    top: 48px
  thead tr:first-child th
    top: 0
</style>
