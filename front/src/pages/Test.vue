<template>
  <div class="q-pt-sm">
    <span class="text-weight-medium text-body1"
      >Ingresa los Hosts (dominios) o escanea alguno primero.
    </span>
    <q-input bg-color="white" v-model="hosts" filled type="textarea" />
    <div class="q-pt-md">
      <q-btn
        align="between"
        icon="fas fa-hourglass-half"
        push
        color="blue-10"
        label="Testear"
      />
      <q-btn
        align="between"
        icon="fas fa-trash-alt"
        class="q-ml-md"
        push
        color="grey-5"
        label="Borrar"
      />
    </div>
    <div class="q-pt-md">
      <span class="text-weight-medium text-body1">Resultados. </span>
      <div>
        <span
          >Total Hosts:
          <q-chip dense>
            <q-avatar color="brown-7" text-color="white">50</q-avatar>
            HTTP
          </q-chip>
          +
          <q-chip dense>
            <q-avatar color="brown-7" text-color="white">50</q-avatar>
            HTTPS
          </q-chip>
          =
          <q-chip dense color="brown-7" text-color="white">
            100
          </q-chip>
        </span>
        <br />
        <span
          >Total escaneados
          <q-chip dense color="blue-grey-7" text-color="white">
            100
          </q-chip>
          de
          <q-chip dense color="blue-grey-7" text-color="white">
            100
          </q-chip></span
        >
        <br />
        <q-chip>
          <q-avatar color="green-7" text-color="white">50</q-avatar>
          HTTP activos
        </q-chip>

        <q-chip>
          <q-avatar color="deep-purple-7" text-color="white">50</q-avatar>
          HTTPS activos
        </q-chip>
        <q-separator spaced inset />
        <div>
          <q-list bordered separator>
            <q-item class="bg-green-2" to="/scan">
              <q-item-section>
                <q-item-label caption
                  >google.com.</q-item-label
                >
              </q-item-section>

              <q-item-section side top>
                <q-badge color="teal" label="10k" />
              </q-item-section>
            </q-item>
            <q-item class="bg-deep-purple-2">
              <q-item-section>
                <q-item-label caption>www.entel.bo</q-item-label>
              </q-item-section>

              <q-item-section side top>
                <q-badge color="teal" label="10k" />
              </q-item-section>
            </q-item>
          </q-list>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Test",
  data: () => ({
    hosts: null
  })
};
</script>
<style>
textarea {
  height: 30vh;
}
</style>
