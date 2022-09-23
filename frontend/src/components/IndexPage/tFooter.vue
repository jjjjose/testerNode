<template>
  <!-- <div class="bg-cyan-9 q-pa-sm" :style="{ width: width + 'px' }"> -->
  <div>
    <q-toolbar class="bg-cyan-9 desktop-hide">
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
            @keyup.enter="menu = true"
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
            @click="menu = true"
          />
        </div>
      </div>
    </q-toolbar>
    <q-dialog v-model="menu" persistent>
      <q-card>
        <q-bar>
          <div>Elige una opcion de Scan</div>

          <q-space />

          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip>Close</q-tooltip>
          </q-btn>
        </q-bar>

        <q-card-section class="column">
          Scan normal, se realiza con apis públicas
          <q-btn
            push
            color="primary"
            label="Normal"
            @click="searchSubdomains"
          />
        </q-card-section>

        <q-card-section class="q-pt-none column">
          <p>
            Scan avanzado, se realiza un scan con Diccionario para buscar
            posibles subdominios, usando BRUTE FORCE
          </p>
          <p>
            para usar esta opcion debe seleccionar un diccionario de cantidad de
            palabras
          </p>

          <div class="column q-gutter-sm">
            <q-select
              dense
              outlined
              v-model="dictionary"
              :options="optionsDictionary"
              label="Elije un diccionario"
              class="col"
              @update:model-value="funAdd"
            />
            <q-btn
              :disable="disableBtnBF"
              push
              color="purple"
              label="Brute Force"
              class="col"
              @click="searchBruteforce"
            />
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from "vue";
import { useGeneralStore } from "../../stores/general";
import { useSubdomainsStore } from "../../stores/subdomains";
import { useQuasar } from "quasar";
const subdomainsStore = useSubdomainsStore();

const $q = useQuasar();
const HOST: any = ref("");
const generalStore = useGeneralStore();
const menu = ref(false);
const dictionary = ref("");
const optionsDictionary = ref([50, 100, 250, 1000, 5000]);
const disableBtnBF = ref(true);

async function searchSubdomains() {
  menu.value = false;
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
    position: "top",
    timeout: 6000,
  });
}

function showLoading() {
  $q.loading.show({
    message: "Estamos buscando subdominios para: \n " + HOST.value,
  });
}
function funAdd() {
  console.log("add");
}
async function searchBruteforce() {
  menu.value = false;
  showLoading();
  generalStore.changeLoading(true);
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
watch(dictionary, (newDictionary) => {
  if (
    newDictionary !== "" ||
    newDictionary !== null ||
    newDictionary !== undefined
  ) {
    disableBtnBF.value = false;
  }
});
</script>
