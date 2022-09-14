<template>
  <router-view />
  <q-resize-observer @resize="onResize" />
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useGeneralStore } from "./stores/general";
const generalStore = useGeneralStore();

function onResize(size: { width: number; height: number }) {
  generalStore.update(size);
}
</script>
