<template>
  <div class="col-md-4">
      <img
        class="card-img-top"
        :src="pokemon?.sprites.other.home.front_default"
        :alt="pokemon?.name">
  </div>
  <div class="col-md-8">
    <div class="card-body">
      <h5 class="card-title">{{ pokemon?.name }} <span>N.º {{ pokemon?.id }}</span></h5>
      <p class="card-text">
        {{ getFlavorTxt(species?.flavor_text_entries) }}
      </p>
      <p class="card-text">Height: {{ pokemon?.height / 10 }}mts.</p>
      <p class="card-text">Weight: {{ pokemon?.weight / 10 }}kg.</p>
      <span
        class="badge rounded-pill bg-primary mx-1"
        v-for="types in pokemon?.types" :key="types?.type">
          {{ types.type.name }}
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  inject,
  onBeforeMount,
} from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import * as types from '@/store/types';

export default defineComponent({
  name: 'Pokemon',
  setup() {
    const route = useRoute();
    const { id } = route.params;
    const axios: any = inject('$http'); // inject axios
    const store = useStore();
    const pokemon = store.getters[types.GET_POKEMON_CONTENT](id);

    interface IResponsePokemon {
      count: number;
      next: string;
      previous: string;
      results: [];
    }
    const getSpecies = async (): Promise<void> => {
      try {
        await axios
          .get(pokemon.species.url)
          .then((response: { data: IResponsePokemon }) => {
            store.dispatch(types.SET_POKEMON_SPECIES, response.data);
          });
      } catch (error) {
        console.log(error);
        const errorLog = {
          error,
          label: 'Error retrieving the pokemon species',
          type: types.MUTATE_SET_POKEMON_SPECIES,
          visible: true,
        };
        // Save error in the store
        store.dispatch(types.SET_ERRORS, errorLog);
      }
    };
    const getFlavorTxt = (flavorListTxt:any[]) => flavorListTxt?.filter((flavor) => flavor.language.name === 'en')[0].flavor_text || '';
    onBeforeMount(() => {
      getSpecies();
    });
    return {
      pokemon,
      getFlavorTxt,
      species: computed(() => store.getters[types.GET_POKEMON_SPECIES]),
    };
  },
});
</script>

<style lang="scss">

</style>
