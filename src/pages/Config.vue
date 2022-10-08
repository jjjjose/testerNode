<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useQuasar } from "quasar";
import { useGeneralStore } from "../stores/general";
import { useSubdomainsStore } from "../stores/subdomains";

const subdomainsStore = useSubdomainsStore();
const generalStore = useGeneralStore();
const $q = useQuasar();
onMounted(() => {
  apiKey.value = generalStore.API_KEY;
});
const apiKey: any = ref("");
const isPwd = ref(true);
async function guardarApi() {
  showLoading();
  let check = await subdomainsStore
    .checkAPI(apiKey.value)
    .then((res) => res)
    .catch((err) => err);
  if (check) {
    localStorage.setItem("API_KEY", apiKey.value);
    generalStore.changeAPI_KEY(apiKey.value);
    isPwd.value = true;
    $q.loading.hide();
    showNotify(
      "positive",
      "Guardado",
      "La API_KEY es valida y se guardo correctamente"
    );
  } else {
    $q.loading.hide();
    apiKey.value = "";
    showNotify("negative", "Error", "La API_KEY no es valida");
  }
}
function borrarApi() {
  localStorage.removeItem("API_KEY");
  generalStore.changeAPI_KEY("");
  apiKey.value = "";
  isPwd.value = false;
  showNotify("negative", "Borrado", "Se borro la API correctamente");
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
    message: "Estamos verificando si tu API_KEY es valida.",
  });
}
</script>
<template>
  <q-page class="q-pa-md">
    <h5>Configuracion</h5>
    <div>
      Introduce tu apikey de VirusTotal, para poder usar el scan de subdominios
      Normal.
    </div>
    <div class="row q-gutter-x-md">
      <q-input
        filled
        v-model="apiKey"
        label="Api Key de VirusTotal"
        :type="isPwd ? 'password' : 'text'"
        class="col"
      >
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>
      <q-btn
        square
        color="green"
        icon="check"
        class="col-1"
        @click="guardarApi"
      />
      <q-btn square color="red" icon="clear" class="col-1" @click="borrarApi" />
    </div>
  </q-page>
</template>
