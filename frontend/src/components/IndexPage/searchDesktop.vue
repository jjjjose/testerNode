<template>
  <!-- <div class="bg-cyan-9 q-pa-sm" :style="{ width: width + 'px' }"> -->
  <div>
    <div class="full-width q-py-xs">
      <div class="text-caption text-grey-10">
        Busca Subdominios a partir de un HOST madre
      </div>
      <div class="row q-gutter-sm q-py-xs">
        <q-input
          rounded
          outlined
          v-model="HOST"
          label="Escribe tu HOST"
          dense
          color="cyan-9"
          bg-color="cyan-1"
          label-color="cyan-7"
          class="col-9"
          @keyup.enter="searchSubdomains"
          ref="target"
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
      <div class="row q-gutter-sm q-pa-xs">
        <TBtnStatus />
        <div class="row items-center" v-if="subdomainsStore.testingStatus">
          <q-spinner-hourglass color="light-green" size="2em" />
          <div class="text-caption">
            checando status de:
            <q-badge
              rounded
              color="blue"
              :label="subdomainsStore.testingTheUrl"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useGeneralStore } from "../../stores/general";
import { useSubdomainsStore } from "../../stores/subdomains";
import { useQuasar } from "quasar";
import { useFocus } from "@vueuse/core";
import TBtnStatus from "./tBtnStatus.vue";

const target = ref();
const { focused } = useFocus(target, { initialValue: true });

const subdomainsStore = useSubdomainsStore();
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

function showNotify(type: string, message: string, caption?: string) {
  $q.notify({
    type,
    message,
    caption,
    progress: true,
    position: "top-right",
    timeout: 6000,
  });
}

function showLoading() {
  $q.loading.show({
    message: "Estamos buscando subdominios para: \n " + HOST.value,
  });
}
</script>
