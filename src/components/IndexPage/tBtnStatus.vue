<template>
  <div>
    <q-btn
      size="sm"
      :disable="subdomainsStore.checkStatus"
      rounded
      color="deep-orange"
      label="Ver Status"
      @click="checkStatus"
    />
  </div>
</template>
<script setup lang="ts">
import { useSubdomainsStore } from "src/stores/subdomains";
import { useQuasar } from "quasar";

const $q = useQuasar();
const subdomainsStore = useSubdomainsStore();

async function checkStatus() {
  let r = await subdomainsStore.checkSubdomainStatus().then((res) => {
    showNotify("positive", "Status de subdominios", "Terminado con exito.");
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
</script>
