<template>
  <div>
    <h5 class="my-3">N.º {{ pokemon?.id }}</h5>
    <router-link :to="{ name: 'pokemon', params: { pokemon: getPokemonName, id: getPokemonId }}">
      <img
        class="card-img-top"
        :src="pokemon?.sprites.other.home?.front_default"
        :alt="getPokemonName">
    </router-link>
    <div class="card-body">
      <h4 class="card-title">
        {{ getPokemonName }}
      </h4>
      <PokemonTypes :typesList="pokemon?.types" />
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  toRefs,
  computed,
} from 'vue';
import { useStore } from 'vuex';
import * as types from '@/store/types';
import PokemonTypes from '@/components/PokemonCardContentType.vue';

export default defineComponent({
  name: 'PokemonCardContent',
  components: {
    PokemonTypes,
  },
  props: {
    url: String,
    name: String,
  },
  setup(props) {
    const store = useStore();
    const { url, name } = toRefs(props);
    // Get the id of the pokemon from the url prop
    const getPokemonId = url.value?.split('/').slice(-2)[0] || 0;
    // Retrieve the pokemon content from the store
    const pokemon = computed(() => store.getters[types.GET_POKEMON_CONTENT](getPokemonId));
    return {
      getPokemonName: name,
      getPokemonId,
      pokemon,
    };
  },
});
</script>

<style lang="scss">
  .card-title {
    text-transform: capitalize;
  }
</style>
