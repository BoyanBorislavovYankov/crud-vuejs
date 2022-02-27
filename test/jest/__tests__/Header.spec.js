import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-jest';
import { describe, expect, it } from '@jest/globals';
import { mount, shallowMount } from '@vue/test-utils';
import Header from "components/Header.vue"

installQuasarPlugin();

describe("Header", () => {
  it("Renders the header component", () => {
    const wrapper = shallowMount(Header, {
    });

    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toContain('q-header-stub');
  })
})
