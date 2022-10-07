<template>
  <!-- <q-item
    clickable
    tag="a"
    target="_blank"
    :href="link"
  > -->
  <q-item
    clickable
    :to="link"
    active-class="bg-teal-2 text-grey-9"
    :active="link === currentRoute.path ? true : false"
  >
    <q-item-section v-if="icon" avatar>
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption>{{ caption }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
export interface EssentialLinkProps {
  title: string;
  caption?: string;
  link?: string;
  icon?: string;
}
//mostrando la ruta actual
import { useRouter } from "vue-router";

const router = useRouter();
const { currentRoute } = router;
// console.log(currentRoute.value.path);

withDefaults(defineProps<EssentialLinkProps>(), {
  caption: "",
  link: "#",
  icon: "",
});
</script>
