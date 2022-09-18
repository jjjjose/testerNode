<template>
  <!-- <div class="bg-cyan-9 q-pa-sm" :style="{ width: width + 'px' }"> -->
  <div>
    <q-toolbar class="bg-cyan-9">
      <div class="full-width q-py-sm">
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
            @keyup.enter="searchSubdomains"
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
    </q-toolbar>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useGeneralStore } from "../../stores/general";
import { useSubdomainsStore } from "../../stores/subdomains";
const subdomainsStore = useSubdomainsStore();
//@ts-ignore
import { useQuasar } from "quasar";
const $q = useQuasar();
const HOST: any = ref("");
const generalStore = useGeneralStore();

async function searchSubdomains() {
  showLoading();
  generalStore.changeLoading(true);
  await subdomainsStore
    .searchSubdomains(HOST.value)
    .then((res) => {
      $q.loading.hide();
      generalStore.changeLoading(false);
      showNotify(
        "positive",
        "Busqueda terminada con exito.",
        "Se encontraron un total de: " + res + " subdominios"
      );
      subdomainsStore.changeCheckStatus(false);
    })
    .catch((err) => {
      $q.loading.hide();
      generalStore.changeLoading(false);
      showNotify("negative", "Algo salio mal!, Intentalo nuevamente.", err);
      subdomainsStore.changeCheckStatus(true);
    });
}

function showNotify(type: String, message: String, caption?: String) {
  $q.notify({
    type,
    message,
    caption,
    progress: true,
    position: "top",
    timeout: 6000,
  });
}

function showLoading() {
  $q.loading.show({
    message: "Estamos buscando subdominios...",
  });
}
</script>
