<template>
  <q-footer elevated class="bg-grey-8 text-white">
    <q-toolbar>
      <q-toolbar-title>

        <div class="row flex justify-between">
          <div class="col q-pa-md" >
            <ul id="footer-menu">
              <li>
                <router-link to="/">Home</router-link>
              </li>
              <li>
                <router-link to="/buildings">Buildings</router-link>
              </li>
            </ul>
          </div>
          <div class="col q-pa-md">
            <div class="float-right">
              Copyright	&copy; 2022
            </div>
          </div>
        </div>

      </q-toolbar-title>
    </q-toolbar>
  </q-footer>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "Footer",
});
</script>

<style>
  ul#footer-menu{
    list-style: none;
    margin: 0;
    padding: 0;
  }
  ul#footer-menu li{
    display: inline-block;
    padding-right: 16px;
  }
  ul#footer-menu a{
    color: var(--q-white);
    text-decoration: none;
  }
  ul#footer-menu a:hover{
    text-decoration: underline;
  }
</style>
