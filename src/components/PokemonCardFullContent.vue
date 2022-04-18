<template>
  <div class="col-md-4">
      <img
        class="card-img-top"
        :src="pokemon?.sprites.other.home.front_default"
        :alt="pokemon?.name">
  </div>
  <div class="col-md-8">
    <div class="card-body">
      <h2 class="card-title">
        {{ pokemon?.name }}
        <span class="badge bg-secondary">Nº{{ pokemon?.id }}</span>
      </h2>
      <p class="card-text">
        {{ getFlavorTxt(species?.flavor_text_entries) }}
      </p>
      <ul class="list-group mb-3">
        <li class="list-group-item d-flex justify-content-between align-items-center">
          Height
          <span class="badge bg-primary rounded-pill">{{ pokemon?.height / 10 }}mts.</span>
        </li>
        <li class="list-group-item d-flex justify-content-between align-items-center">
          Weight
          <span class="badge bg-primary rounded-pill">{{ pokemon?.weight / 10 }}kg.</span>
        </li>
      </ul>
      <h5>Type</h5>
      <PokemonTypes :typesList="pokemon?.types" />
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
import PokemonTypes from '@/components/PokemonCardContentType.vue';

export default defineComponent({
  name: 'Pokemon',
  components: {
    PokemonTypes,
  },
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
