<template>
  <q-layout view="lHh Lpr lFf" class="bg-grey-1">
    <q-header elevated class="bg-cyan-9">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
          class="mobile-hide"
        />

        <q-toolbar-title> TesterNode App </q-toolbar-title>

        <div>{{ generalStore.version }}</div>
      </q-toolbar>
    </q-header>
    <q-footer> <t-footer /></q-footer>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Menu </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import tFooter from "components/IndexPage/tFooter.vue";
import { useGeneralStore } from "stores/general";
import { ref } from "vue";
import EssentialLink, {
  EssentialLinkProps,
} from "components/EssentialLink.vue";

const generalStore = useGeneralStore();

const essentialLinks: EssentialLinkProps[] = [
  {
    title: "Scan all",
    caption: "escanea subdominios y verifica su estado de cada metodo",
    icon: "search",
    link: "/",
  },
  {
    title: "Config",
    caption: "Configuracion de la aplicacion",
    icon: "settings",
    link: "/config",
  },
];

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
