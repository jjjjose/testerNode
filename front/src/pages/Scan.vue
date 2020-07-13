<template>
  <div class="q-pt-md">
    <span>Escribe solo el dominio (sin https://www) ejemplo => google.com</span>
    <q-input class="bg-white" v-model="host" label="Host" />
    <div class="q-pt-md">
      <q-btn
        align="between"
        icon="fas fa-hourglass-half"
        push
        color="blue-10"
        label="Escanear"
        @click.prevent="escanear"
      />
      <q-btn
        align="between"
        icon="fas fa-save"
        class="q-ml-md"
        push
        color="green-5"
        label="Guardar para escanear"
        @click="save"
      />
      <q-btn
        align="between"
        icon="fas fa-trash-alt"
        class="q-ml-md"
        push
        color="grey-5"
        label="Borrar"
        @click="borrar"
      />
    </div>
    <q-separator spaced inset />
    <q-list bordered separator>
      <q-item
        class="bg-green-2"
        v-for="(sitio, index) in subdominios"
        :key="'sitio' + index"
      >
        <q-item-section>
          <q-item-label caption>{{ sitio }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
    <pre>{{ $data }}</pre>
  </div>
</template>
<script>
import { mapMutations, mapState } from "vuex";
export default {
  name: "Scan",
  data: () => ({
    host: null,
    subdominios: []
  }),
  methods: {
    ...mapMutations("test", ["guardar"]),
    save() {
      this.guardar(this.subdominios);
    },
    borrar() {
      this.host = null;
      this.subdominios = [];
    },
    async escanear() {
      let HOST = "http://localhost:55/";

      const DATOS = {
        type: "scan",
        site: this.host
      };

      let res = await fetch(HOST, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        mode: "cors",
        body: JSON.stringify(DATOS)
      }).then(rest => rest.json());

      let resultado = res.Subdomains;
      let ii = 0;

      for (let i = 1; i <= resultado.length; i++) {
        this.subdominios.push(resultado[ii].hostname);
        ii++;
      }
    }
  }
};
</script>
