<template>
  <q-page class="q-pa-md">
    <div class="q-my-md mobile-hide">
      <search-desktop />
    </div>
    <t-list2 />
    <div class="q-my-xl desktop-hide">.</div>

    <q-page-sticky
      position="bottom-left"
      :offset="[15, 9]"
      class="desktop-hide"
    >
      <t-btn-status />
    </q-page-sticky>
    <q-page-sticky
      v-if="subdomainsStore.testingStatus"
      position="bottom-right"
      :offset="[15, 9]"
      class="desktop-hide"
    >
      <div class="row items-center">
        <q-spinner-hourglass color="light-green" size="2em" />
        <div class="text-caption column">
          checando status de:
          <q-badge
            rounded
            color="blue"
            :label="subdomainsStore.testingTheUrl"
          />
        </div>
      </div>
    </q-page-sticky>
  </q-page>
</template>

<script setup lang="ts">
import tFooter from "components/IndexPage/tFooter.vue";
import tList from "components/IndexPage/tList.vue";
import TList2 from "src/components/IndexPage/tList2.vue";
import TBtnStatus from "src/components/IndexPage/tBtnStatus.vue";
import { useSubdomainsStore } from "src/stores/subdomains";
import { onMounted } from "vue";
import SearchDesktop from "src/components/IndexPage/searchDesktop.vue";
const subdomainsStore = useSubdomainsStore();

onMounted(() => {
  if (subdomainsStore.subdomains.length === 0) {
    subdomainsStore.changeCheckStatus(true);
  } else {
    subdomainsStore.changeCheckStatus(false);
  }
});
</script>
