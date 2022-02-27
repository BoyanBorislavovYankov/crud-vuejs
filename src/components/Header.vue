<template>
  <q-header elevated>
    <q-toolbar>
      <q-toolbar-title>
        <div class="q-pa-md">Welcome</div>
      </q-toolbar-title>
      <div>
        <div class="q-pa-md">
          <img src="~assets/avatar.png" alt="Avatar" />
        </div>
      </div>
    </q-toolbar>
  </q-header>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "Header",
});
</script>
