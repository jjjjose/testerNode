<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useQuasar } from "quasar";
import { useGeneralStore } from "../stores/general";
const generalStore = useGeneralStore();
const $q = useQuasar();
onMounted(() => {
  apiKey.value = generalStore.API_KEY;
});
const apiKey = ref("");
const isPwd = ref(true);
function guardarApi() {
  localStorage.setItem("API_KEY", apiKey.value);
  isPwd.value = true;
  showNotify("positive", "Guardado", "Se guardo la API correctamente");
}
function borrarApi() {
  localStorage.removeItem("API_KEY");
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
