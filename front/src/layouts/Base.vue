<template>
  <q-layout view="hHh lpR fFf" class="bg-teal-1">
    <q-header elevated>
      <q-toolbar class="bg-teal-10">
        <q-toolbar-title>
          TesterNode
        </q-toolbar-title>
        <div>
          created by jjjose
          <q-btn
            type="a"
            href="https://github.com/jjjjose/testerNode"
            target="_blank"
            flat
            round
            dense
            icon="fab fa-github"
          />
        </div>
      </q-toolbar>
    </q-header>
    <q-page-container class="q-pa-sm">
      <router-view />
    </q-page-container>
    <!-- <Footer /> -->
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-fab icon="fas fa-chevron-up" direction="up" color="accent">
        <q-fab-action
          square
          external-label
          label-position="left"
          color="primary"
          to="/test"
          icon="far fa-hand-point-left"
          label="Tester"
        />
        <q-fab-action
          square
          external-label
          label-position="left"
          color="secondary"
          to="/scan"
          icon="fas fa-globe"
          label="Escaner"
        />
      </q-fab>
    </q-page-sticky>
  </q-layout>
</template>
<script>
import Footer from "components/Base/Footer";
export default {
  name: "Base",
  components: {
    Footer
  }
};
</script>
