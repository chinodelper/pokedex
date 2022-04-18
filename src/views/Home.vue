<template>
  <pokemon-card
    v-for="pokemon in pokemonList"
    :key="pokemon.name"
    :baseContent="pokemon"
  />
  <nav aria-label="Page navigation example" class="my-5">
    <ul class="pagination justify-content-center pagination-lg">
      <li class="page-item">
        <a class="page-link" href="#" @click.stop.prevent="prev">Previous</a>
      </li>
      <li class="page-item">
        <a class="page-link" href="#" @click.stop.prevent="next">Next</a>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  inject,
} from 'vue';
import PokemonCard from '@/components/PokemonCard.vue';
import { useStore } from 'vuex';
import * as types from '@/store/types';

export default defineComponent({
  name: 'Home',
  components: {
    PokemonCard,
  },
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
    const store = useStore();
    const axios: any = inject('$http'); // inject axios
    const prevUrl = store.getters[types.GET_PREV_PAGE];
    const nextUrl = store.getters[types.GET_NEXT_PAGE];
    const updateList = async (url: string): Promise<void> => {
      store.dispatch(types.SET_START_LOADING); // Start loading
      try {
        await axios
          .get(url)
          .then((response: { data: IResponsePokemon }) => {
            store.dispatch(types.SET_POKEMON, response.data.results);
            store.dispatch(types.SET_NEXT_PAGE, response.data.next);
            store.dispatch(types.SET_PREV_PAGE, response.data.previous);
          });
      } catch (error) {
        console.log(error);
        const errorLog = {
          error,
          label: 'Error updating the pokemon list',
          type: types.SET_POKEMON,
          visible: true,
        };
        // Save error in the store
        store.dispatch(types.SET_ERRORS, errorLog);
      }
    };
    const prev = () => updateList(prevUrl);
    const next = () => updateList(nextUrl);
    return {
      pokemonList: computed(() => store.getters[types.GET_POKEMON]),
      prev,
      next,
    };
  },
});
</script>
