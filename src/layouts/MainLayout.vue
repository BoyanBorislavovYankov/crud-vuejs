<template>
  <q-layout view="lHh Lpr lFf">

    <q-page-container>
      <router-view />
    </q-page-container>

    <Footer />

  </q-layout>
</template>

<script>
import Footer from "components/Footer.vue";

import { defineComponent } from "vue";

export default defineComponent({
  name: "MainLayout",
  components: {
    Footer,
  },
  setup() {
    return {
    };
  },
});
</script>
