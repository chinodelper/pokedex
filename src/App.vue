<template>
  <div id="nav">
    <router-link to="/">Pokédex</router-link> |
    <router-link to="/addNew">Add Pokemon</router-link>
  </div>
  <router-view/>
</template>

<script lang="ts">
import { defineComponent, onMounted, inject } from 'vue';
import { useStore } from 'vuex';
import * as types from '@/store/types';
import POKEAPI from './api';

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
    const store = useStore();
    const getList = async (): Promise<void> => {
      try {
        await axios
          .get(POKEAPI.getAll)
          .then((response: { data: IResponsePokemon }) => {
            console.log(response.data);
            store.dispatch(types.SET_POKEMON, response.data.results);
          });
      } catch (error) {
        console.log(error);
        // const errorLog = {
        //   error,
        //   label: 'Error retrieving the pokemon list',
        //   type: types.SET_POKEMON,
        //   visible: true,
        // };
        // // Save error in the store
        // store.dispatch(types.MUTATE_SET_ERRORS, errorLog);
      }
    };
    onMounted(() => {
      getList();
    });
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

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
