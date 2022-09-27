<template>
  <div>
    <q-table
      v-if="subdomainsStore.checkStatusTable"
      class="my-sticky-header-column-table"
      :style="{ height: height - 200 + 'px' }"
      dense
      title="Subdominios"
      :rows="subdomainsStore.subdomainsChecked"
      :columns="subdomainsStore.columns"
      row-key="subdomain"
      :pagination="pag"
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="subdomain" :props="props">
            <a
              :href="props.row.subdomain"
              class="caption text-indigo-10"
              target="_blank"
            >
              <q-tooltip anchor="top right" self="top middle">
                Visitar...
              </q-tooltip>
              {{ props.row.subdomain }}
              <q-icon name="launch" />
            </a>
          </q-td>
          <!-- datos GET -->
          <q-td key="get" :props="props">
            <q-badge v-if="props.row.statusGET === 200" dense color="green">
              {{ props.row.statusGET }}
            </q-badge>

            <q-badge v-else-if="props.row.statusGET === 404" dense color="red">
              {{ props.row.statusGET }}
            </q-badge>
            <q-badge v-else dense color="orange">
              {{ props.row.statusGET }}
            </q-badge>
          </q-td>
          <!-- datos POST -->
          <q-td key="post" :props="props">
            <q-badge v-if="props.row.statusPOST === 200" dense color="green">
              {{ props.row.statusPOST }}
            </q-badge>

            <q-badge v-else-if="props.row.statusPOST === 404" dense color="red">
              {{ props.row.statusPOST }}
            </q-badge>
            <q-badge v-else dense color="orange">
              {{ props.row.statusPOST }}
            </q-badge>
          </q-td>
          <!-- datos PUT -->
          <q-td key="put" :props="props">
            <q-badge v-if="props.row.statusPUT === 200" dense color="green">
              {{ props.row.statusPUT }}
            </q-badge>

            <q-badge v-else-if="props.row.statusPUT === 404" dense color="red">
              {{ props.row.statusPUT }}
            </q-badge>
            <q-badge v-else dense color="orange">
              {{ props.row.statusPUT }}
            </q-badge>
          </q-td>
          <!-- datos DELETE -->
          <q-td key="delete" :props="props">
            <q-badge v-if="props.row.statusDELETE === 200" dense color="green">
              {{ props.row.statusDELETE }}
            </q-badge>

            <q-badge
              v-else-if="props.row.statusDELETE === 404"
              dense
              color="red"
            >
              {{ props.row.statusDELETE }}
            </q-badge>
            <q-badge v-else dense color="orange">
              {{ props.row.statusDELETE }}
            </q-badge>
          </q-td>
          <!-- datos PATCH -->
          <q-td key="patch" :props="props">
            <q-badge v-if="props.row.statusPATCH === 200" dense color="green">
              {{ props.row.statusPATCH }}
            </q-badge>

            <q-badge
              v-else-if="props.row.statusPATCH === 404"
              dense
              color="red"
            >
              {{ props.row.statusPATCH }}
            </q-badge>
            <q-badge v-else dense color="orange">
              {{ props.row.statusPATCH }}
            </q-badge>
          </q-td>
          <!-- datos HEAD -->
          <q-td key="head" :props="props">
            <q-badge v-if="props.row.statusHEAD === 200" dense color="green">
              {{ props.row.statusHEAD }}
            </q-badge>

            <q-badge v-else-if="props.row.statusHEAD === 404" dense color="red">
              {{ props.row.statusHEAD }}
            </q-badge>
            <q-badge v-else dense color="orange">
              {{ props.row.statusHEAD }}
            </q-badge>
          </q-td>
          <!-- datos OPTIONS -->
          <q-td key="options" :props="props">
            <q-badge v-if="props.row.statusOPTIONS === 200" dense color="green">
              {{ props.row.statusOPTIONS }}
            </q-badge>

            <q-badge
              v-else-if="props.row.statusOPTIONS === 404"
              dense
              color="red"
            >
              {{ props.row.statusOPTIONS }}
            </q-badge>
            <q-badge v-else dense color="orange">
              {{ props.row.statusOPTIONS }}
            </q-badge>
          </q-td>
          <!-- datos TRACE -->
          <q-td key="trace" :props="props">
            <q-badge v-if="props.row.statusTRACE === 200" dense color="green">
              {{ props.row.statusTRACE }}
            </q-badge>

            <q-badge
              v-else-if="props.row.statusTRACE === 404"
              dense
              color="red"
            >
              {{ props.row.statusTRACE }}
            </q-badge>
            <q-badge v-else dense color="orange">
              {{ props.row.statusTRACE }}
            </q-badge>
          </q-td>
        </q-tr>
      </template>
    </q-table>
    <q-table
      v-else
      class="my-sticky-header-column-table"
      :style="{ height: height - 200 + 'px' }"
      dense
      title="Subdominios"
      :rows="subdomainsStore.subdomains"
      :columns="subdomainsStore.columns2"
      row-key="id"
      :pagination="pag"
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="id" :props="props"> {{ props.row.id }} </q-td>
          <q-td key="subdomain" :props="props">
            {{ props.row.subdomain }}
          </q-td>
          <q-td key="get" :props="props">
            <!-- <q-badge dense color="green"> http </q-badge>

            <q-badge dense color="red"> https </q-badge> -->
          </q-td>
          <!-- <q-td key="name" :props="props">
            {{ props.row.name }}
          </q-td>

          <q-td key="calories" :props="props">
            <q-badge color="green">
              {{ props.row.calories }}
            </q-badge>
          </q-td>
          <q-td key="fat" :props="props">
            <q-badge color="purple">
              {{ props.row.fat }}
            </q-badge>
          </q-td> -->
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import { useWindowSize } from "@vueuse/core";
import { useSubdomainsStore } from "src/stores/subdomains";
const { height } = useWindowSize();
const subdomainsStore = useSubdomainsStore();
const pag = {
  rowsPerPage: 20,
};
</script>
<style lang="sass">
.my-sticky-header-column-table
  /* height or max-height is important */
  height: 310px

  /* specifying max-width so the example can
    highlight the sticky column on any browser window */
  // max-width: 600px

  td:first-child
    /* bg color is important for td; just specify one */
    background-color: #ede7f6 !important

  tr th
    position: sticky
    /* higher than z-index for td below */
    z-index: 2
    /* bg color is important; just specify one */
    background: #fff

  /* this will be the loading indicator */
  thead tr:last-child th
    /* height of all previous header rows */
    top: 48px
    /* highest z-index */
    z-index: 3
  thead tr:first-child th
    top: 0
    z-index: 1
  tr:first-child th:first-child
    /* highest z-index */
    z-index: 3

  td:first-child
    z-index: 1

  td:first-child, th:first-child
    position: sticky
    left: 0
</style>
