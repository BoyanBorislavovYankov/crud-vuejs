import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-jest';
import { describe, expect, it } from '@jest/globals';
import { mount, shallowMount } from '@vue/test-utils';
import Buildings from "pages/Buildings.vue"

installQuasarPlugin();

describe("Buildings", () => {
  it("Renders the Buildings page", () => {
    const wrapper = shallowMount(Buildings, {
    });

    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toContain('q-page-stub');
  });

  it("Add item form", () => {
    const wrapper = shallowMount(Buildings, {
    });
    wrapper.vm.editedIndex = 2;
    wrapper.vm.showDialog = false;
    wrapper.vm.editedItem.id = 5;

    wrapper.vm.addItemForm();

    expect(wrapper.vm.editedIndex).toBe(null);
    expect(wrapper.vm.showDialog).toBe(true);
    expect(wrapper.vm.editedItem.id).toBe(null);
  });

  it("Edit item form", () => {
    const wrapper = shallowMount(Buildings, {
    });
    wrapper.vm.editedIndex = null;
    wrapper.vm.showDialog = false;
    wrapper.vm.editedItem = null;
    wrapper.vm.rows = [
      {
        id: 1,
        name: 'Windsor',
        area: 1590,
        location: 'Sofia, Bulgaria',
        image: 'https://images.pexels.com/photos/302769/pexels-photo-302769.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=160&w=120'
      },
    ];

    wrapper.vm.editItemForm(wrapper.vm.rows[0]);

    expect(wrapper.vm.editedIndex).toBe(0);
    expect(wrapper.vm.showDialog).toBe(true);
    expect(wrapper.vm.editedItem.id).toBe(wrapper.vm.rows[0].id);
  });

  it("Close item form", () => {
    const wrapper = shallowMount(Buildings, {
    });
    wrapper.vm.editedIndex = 2;
    wrapper.vm.showDialog = true;
    wrapper.vm.editedItem = null;
    wrapper.vm.defaultItem = {
      id: 1,
      name: 'Windsor',
      area: 1590,
      location: 'Sofia, Bulgaria',
      image: 'https://images.pexels.com/photos/302769/pexels-photo-302769.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=160&w=120'
    };

    wrapper.vm.closeItemForm();

    expect(wrapper.vm.editedIndex).toBe(null);
    expect(wrapper.vm.showDialog).toBe(false);
    expect(wrapper.vm.editedItem.id).toBe(wrapper.vm.defaultItem.id);
  });

  it("Modify row - add", () => {
    jest.spyOn(Buildings.methods, 'checkForm').mockReturnValue(true);

    const wrapper = shallowMount(Buildings, {
    });

    wrapper.vm.editedIndex = null;
    wrapper.vm.rows = [];
    wrapper.vm.editedItem = {
      id: 1,
      name: 'Windsor',
      area: 1590,
      location: 'Sofia, Bulgaria',
      image: 'https://images.pexels.com/photos/302769/pexels-photo-302769.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=160&w=120'
    };

    wrapper.vm.modifyRow();

    expect(wrapper.vm.rows[0].id).toBe(1);
    expect(wrapper.vm.editedIndex).toBe(null);
  });

  it("Modify row - edit", () => {
    jest.spyOn(Buildings.methods, 'checkForm').mockReturnValue(true);

    const wrapper = shallowMount(Buildings, {
    });

    wrapper.vm.editedIndex = 0;
    wrapper.vm.rows = [
      {
        id: 1,
        name: 'Windsor',
        area: 1590,
        location: 'Sofia, Bulgaria',
        image: 'https://images.pexels.com/photos/302769/pexels-photo-302769.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=160&w=120'
      }
    ];
    wrapper.vm.editedItem = {
      id: 1,
      name: 'Test',
      area: 1590,
      location: 'Sofia, Bulgaria',
      image: 'https://images.pexels.com/photos/302769/pexels-photo-302769.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=160&w=120'
    };

    wrapper.vm.modifyRow();

    expect(wrapper.vm.rows[0].name).toBe('Test');
    expect(wrapper.vm.editedIndex).toBe(null);
  });

  it("Delete item prompt", () => {
    jest.spyOn(window, 'confirm').mockReturnValue(true);

    const wrapper = shallowMount(Buildings, {
    });

    wrapper.vm.rows = [
      {
        id: 1,
        name: 'Windsor',
        area: 1590,
        location: 'Sofia, Bulgaria',
        image: 'https://images.pexels.com/photos/302769/pexels-photo-302769.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=160&w=120'
      }
    ];

    wrapper.vm.deleteItemPrompt(0);

    expect(wrapper.vm.rows.length).toBe(0);
  });
})
