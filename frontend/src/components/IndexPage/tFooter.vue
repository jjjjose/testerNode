<template>
  <div class="bg-cyan-9 q-pa-sm" :style="{ width: width + 'px' }">
    <div class="text-caption text-grey-1">
      Busca Subdominios a partir de un HOST madre
    </div>
    <div class="row q-gutter-sm q-pa-xs">
      <q-input
        rounded
        outlined
        v-model="HOST"
        label="Escribe tu HOST"
        dense
        color="cyan-9"
        bg-color="cyan-1"
        label-color="cyan-7"
        class="col-7"
      >
        <template v-slot:prepend>
          <q-icon name="search" color="cyan-7" />
        </template>
      </q-input>
      <q-btn
        dense
        push
        color="green-7"
        label="Buscar"
        class="col"
        align="around"
        icon-right="chevron_right"
        @click="searchSubdomains"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useGeneralStore } from "../../stores/general";
import { useSubdomainsStore } from "../../stores/subdomains";
const subdomainsStore = useSubdomainsStore();

async function searchSubdomains() {
  await subdomainsStore.seachSubdomains(HOST.value);
}

const size = ref("");
const HOST: any = ref("");
const generalStore = useGeneralStore();
const { width, height } = generalStore;
size.value = `${width} x ${height}`;
</script>
