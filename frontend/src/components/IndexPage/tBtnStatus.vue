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
const subdomainsStore = useSubdomainsStore();

async function checkStatus() {
  await subdomainsStore.checkSubdomainStatus();
}
</script>
