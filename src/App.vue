<template>
  <nav v-if="!isLoading" class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Pokédex</a>
      <button class="navbar-toggler"
        type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link" aria-current="page" to="/">All</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/addNew">Add New</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <div class="container">
    <div class="row">
      <div class="text-center my-5" v-if="isLoading">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
      <router-view v-if="!isLoading"/>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onBeforeMount,
  inject,
  computed,
} from 'vue';
import { useStore } from 'vuex';
import * as types from '@/store/types';
import POKEAPI from '@/api';

export default defineComponent({
  name: 'App',
  setup() {
    type Pokemon = {
      name: string,
      url: string
    }
    interface IResponsePokemon {
      count: number;
      next: string;
      previous: string;
      results: Pokemon[];
    }
    const axios: any = inject('$http'); // inject axios
    const store = useStore(); // inject vuex
    const getList = async (): Promise<void> => {
      try {
        await axios
          .get(POKEAPI.getAll)
          .then((response: { data: IResponsePokemon }) => {
            store.dispatch(types.SET_POKEMON, response.data.results);
            store.dispatch(types.SET_NEXT_PAGE, response.data.next);
            store.dispatch(types.SET_PREV_PAGE, response.data.previous);
          });
      } catch (error) {
        console.log(error);
        const errorLog = {
          error,
          label: 'Error retrieving the pokemon list',
          type: types.SET_POKEMON,
          visible: true,
        };
        // Save error in the store
        store.dispatch(types.SET_ERRORS, errorLog);
      }
    };
    onBeforeMount(() => {
      store.dispatch(types.SET_START_LOADING); // Start loading
      getList();
    });
    return {
      isLoading: computed(() => store.getters[types.GET_IS_LOADING]),
    };
  },
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
