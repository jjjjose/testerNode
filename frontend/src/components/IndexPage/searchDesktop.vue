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
          class="col-5"
          @keyup.enter="searchSubdomains"
          ref="target"
        >
          <template v-slot:prepend>
            <q-icon name="search" color="cyan-7" />
          </template>
        </q-input>
        <div class="col-5 row">
          <q-radio
            size="sm"
            keep-color
            v-model="type"
            val="normal"
            label="Normal"
            color="teal"
            class="col-3"
          >
            <q-tooltip anchor="top middle" self="center middle">
              Escaneo rápido con API publicas.
            </q-tooltip>
          </q-radio>
          <q-radio
            size="sm"
            keep-color
            v-model="type"
            val="bruteforce"
            label="Brute Force"
            color="teal"
            class="col"
          >
            <q-tooltip anchor="top middle" self="center middle">
              Escaneo con Diccionario de palabras clave, demora mas tiempo, debe
              seleccionar un diccionario.
            </q-tooltip>
          </q-radio>
          <q-select
            dense
            filled
            v-model="dictionary"
            :options="optionsDictionary"
            label="Selec. diccionario"
            class="col"
          >
            <q-tooltip anchor="top middle" self="center middle">
              Diccionario con cantidad de Palabras clave, solo para BruteForce.
            </q-tooltip>
          </q-select>
        </div>
        <q-btn
          :disable="disableSearch"
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
import { Ref, ref, watch } from "vue";
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
// const menu = ref(false);
const dictionary = ref("");
const optionsDictionary = ref([50, 100, 250, 1000, 5000]);
const type = ref("normal");
const disableSearch = ref(false);

async function searchSubdomains() {
  // menu.value = false;
  showLoading();
  generalStore.changeLoading(true);

  //escanear subdominios con la opcion normal
  if (type.value === "normal") {
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
  } else if (type.value === "bruteforce") {
    await subdomainsStore
      .searchBruteForce(HOST.value, Number(dictionary.value))
      .then((res) => {
        $q.loading.hide();
        generalStore.changeLoading(false);
        showNotify(
          "positive",
          "BruteForce terminado con exito.",
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
watch(type, (newType) => {
  if (newType === "bruteforce") {
    disableSearch.value = true;
    dictionary.value = "";
  } else if (newType === "normal") {
    disableSearch.value = false;
    dictionary.value = "";
  }
});
watch(dictionary, (newDictionary) => {
  if (
    newDictionary !== "" ||
    newDictionary !== null ||
    newDictionary !== undefined
  ) {
    disableSearch.value = false;
  }
});
</script>
