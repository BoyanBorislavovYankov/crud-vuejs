import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-jest';
import { describe, expect, it } from '@jest/globals';
import { mount, shallowMount } from '@vue/test-utils';
import { createRouter, createWebHistory } from 'vue-router'
import Footer from "components/Footer.vue"

installQuasarPlugin();

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: { template: '' }
    },
  ],
})

describe("Footer", () => {

  it("Renders the footer component", async () => {
    router.push('/')
    await router.isReady()

    const wrapper = shallowMount(Footer, {
      global: {
        plugins: [router]
      }
    });

    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toContain('q-footer-stub');
  });
})
