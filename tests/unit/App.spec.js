import App from '@/App.vue';
import { mount } from '@vue/test-utils';
import { createStore } from 'vuex';
import * as types from '@/store/types';

describe('App', () => {
  let store;

  beforeEach(() => {
    store = createStore({
      state: {
        pokemonList: [],
      },
    });
  });

  test('Uses vuex isLoading state', async () => {
    // Arrange
    const wrapper = mount(App, {
      global: { plugins: [store] },
    });

    // Assert
    expect(wrapper.find('#navbar').isVisible()).toBe(true);
  });

  test('Uses vuex getErrors state', async () => {
    // Arrange
    const wrapper = mount(App, {
      global: { plugins: [store] },
    });

    // Assert
    expect(wrapper.find('#get-errors').isVisible()).toBe(false);
  });
});
