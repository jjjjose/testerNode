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
    />
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useSubdomainsStore } from "../../stores/subdomains";
const subdomainsStore = useSubdomainsStore();
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
