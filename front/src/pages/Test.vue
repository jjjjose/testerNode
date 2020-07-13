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
        @click.prevent="ordenar"
      />
      <q-btn
        align="between"
        icon="fas fa-trash-alt"
        class="q-ml-md"
        push
        color="grey-5"
        label="Borrar"
        @click.prevent="borrar"
      />
    </div>
    <div class="q-pt-md">
      <span class="text-weight-medium text-body1">Resultados. </span>
      <div>
        <span
          >Total Hosts:
          <q-chip dense>
            <q-avatar color="brown-7" text-color="white">{{
              hostsOrdenados.length
            }}</q-avatar>
            HTTP
          </q-chip>
          +
          <q-chip dense>
            <q-avatar color="brown-7" text-color="white">{{
              hostsOrdenados.length
            }}</q-avatar>
            HTTPS
          </q-chip>
          =
          <q-chip dense color="brown-7" text-color="white">
            {{ hostsOrdenados.length * 2 }}
          </q-chip>
        </span>
        <br />
        <span
          >Total escaneados
          <q-chip dense color="blue-grey-7" text-color="white">
            {{ scans }}
          </q-chip>
          de
          <q-chip dense color="blue-grey-7" text-color="white">
            {{ hostsOrdenados.length * 2 }}
          </q-chip></span
        >
        <q-separator spaced inset />
        <q-chip>
          <q-avatar color="green-7" text-color="white">{{
            http.length
          }}</q-avatar>
          HTTP activos
        </q-chip>

        <q-chip>
          <q-avatar color="deep-purple-7" text-color="white">{{
            https.length
          }}</q-avatar>
          HTTPS activos
        </q-chip>
        <q-separator spaced inset />

        <q-list bordered separator>
          <q-item
            tag="a"
            class="bg-green-2"
            v-for="(sitio2, index) in http"
            :key="'sitio2' + index"
            :href="sitio2.URL"
            target="_blank"
          >
            <q-item-section>
              <q-item-label caption>{{ sitio2.URL }}</q-item-label>
            </q-item-section>

            <q-item-section side top>
              <q-badge color="green-9" :label="sitio2.status" />
            </q-item-section>
          </q-item>
          <q-item
            tag="a"
            class="bg-deep-purple-2"
            v-for="(sitio3, index) in https"
            :key="'sitio3' + index"
            :href="sitio3.URL"
            target="_blank"
          >
            <q-item-section>
              <q-item-label caption>{{ sitio3.URL }}</q-item-label>
            </q-item-section>

            <q-item-section side top>
              <q-badge color="deep-purple-9" :label="sitio3.status" />
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </div>
    <pre>
      {{ $data }}
    </pre>
  </div>
</template>
<script>
import { mapMutations, mapState } from "vuex";
export default {
  name: "Test",
  created() {
    // preugntar si esta guardado un escaneo reciente
    if (this.Vhosts === null) {
    } else {
      this.mostrar();
    }
  },
  data: () => ({
    hosts: null,
    orden: null,
    hostsOrdenados: [],
    http: [],
    https: [],
    scans: 0
  }),
  methods: {
    // recibiendo los datos guardados del escan para testear
    mostrar() {
      var cadena = this.Vhosts.toString(),
        patron = /,/g,
        nuevoValor = "\n",
        nuevaCadena = cadena.replace(patron, nuevoValor);
      this.hosts = nuevaCadena;
    },
    borrar() {
      this.hosts = null;
      this.orden = null;
      this.hostsOrdenados = [];
      this.http = [];
      this.https = [];
      this.scans = 0;
    },
    borrar2() {
      // this.hosts = null;
      this.orden = null;
      this.hostsOrdenados = [];
      this.http = [];
      this.https = [];
      this.scans = 0;
    },
    buscar() {
      this.http = [];
      this.https = [];
      // se pasa los datos uno por uno de la Textarea
      let lugar = 0;
      for (var i = 0; i < this.hostsOrdenados.length; i++) {
        let URL = this.hostsOrdenados[lugar];
        this.tester(`http://${URL}`);
        this.tester(`https://${URL}`);
        lugar++;
      }
    },
    // enviar los datos ordenado para consultar su status
    async tester(URL) {
      // let HOST = "http://localhost/tester/";
      let HOST = "http://localhost:55/";

      const DATOS = {
        type: "test",
        site: URL
      };
      // enviamos la consulta a la API Local
      let res = await fetch(HOST, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        mode: "cors",
        body: JSON.stringify(DATOS)
      }).then(rest => rest.json());

      // verificando la respuesta para poner solo a los que tienen status 200
      if (res.status === 200) {
        this.scans++;
        // preguntar su la url es http o https y ordenar
        if (URL.indexOf("https") > -1) {
          this.https.push({
            URL,
            status: res.status
          });
        } else {
          this.http.push({
            URL,
            status: res.status
          });
        }
      } else {
        this.scans++;
      }
      // console.log(URL.indexOf("https") > -1);

      // console.log(res);
    },
    // Ordenando para el envio de los datos
    ordenar() {
      this.borrar2();
      var cadena = this.hosts,
        patron = / /g,
        nuevoValor = "",
        nuevaCadena = cadena.replace(patron, nuevoValor);
      this.orden = nuevaCadena;
      var cadena = this.orden,
        separador = "\n",
        arregloDeSubCadenas = cadena.split(separador);
      this.hostsOrdenados = arregloDeSubCadenas;
      this.buscar();
    }
  },
  computed: {
    ...mapState("test", ["Vhosts"])
  }
};
</script>
<style>
textarea {
  height: 30vh;
}
</style>
