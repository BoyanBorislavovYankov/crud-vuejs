import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-jest';
import { describe, expect, it } from '@jest/globals';
import { mount, shallowMount } from '@vue/test-utils';
import Index from "pages/Index.vue"

installQuasarPlugin();

describe("Index", () => {
  it("Renders the Index page", () => {
    const wrapper = shallowMount(Index, {
    });

    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toContain('q-page-stub');
  });
})
