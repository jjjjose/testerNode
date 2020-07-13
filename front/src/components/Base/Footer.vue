<template>
  <div>
    <q-footer elevated class="bg-teal-10 text-white">
      <q-tabs
        v-model="this.$route.path"
        switch-indicator
        class="text-grey-4"
        active-color="cyan-12"
        indicator-color="cyan-12"
        align="justify"
      >
        <q-route-tab
          to="/test"
          exact
          name="/test"
          icon="fas fa-chart-line"
          label="tester"
        />
        <q-route-tab
          to="/scan"
          exact
          name="/scan"
          icon="fas fa-file"
          label="Escaner"
        />
      </q-tabs>
    </q-footer>
  </div>
</template>
<script>
export default {
  data: () => ({
    // tab: this.$route.path
  })
};
</script>
<style lang="sass" scoped>

.pa
  height: 2rem
  font-size: 0.85rem
.abajo
  font-size: 0.55rem
</style>
