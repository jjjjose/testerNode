<template>
  <q-page class="q-pa-md">
    <t-list />
    <q-page-sticky position="bottom" :offset="[0, 0]" class="full-width">
      <t-footer />
    </q-page-sticky>
  </q-page>
</template>

<script setup lang="ts">
import tFooter from "components/IndexPage/tFooter.vue";
import tList from "components/IndexPage/tList.vue";
</script>
