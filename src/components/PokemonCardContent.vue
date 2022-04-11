<template>
  <div>
    <h5 class="my-3">N.º {{ pokemon?.id }}</h5>
    <router-link :to="{ name: 'pokemon', params: { pokemon: getPokemonName, id: getPokemonId }}">
      <img
        class="card-img-top"
        :src="pokemon?.sprites.other.home.front_default"
        :alt="pokemon?.name">
    </router-link>
    <div class="card-body">
      <h4 class="card-title">
        {{ pokemon?.name }}
      </h4>
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
  toRefs,
  computed,
} from 'vue';
import { useStore } from 'vuex';
import * as types from '@/store/types';

export default defineComponent({
  name: 'PokemonCardContent',
  props: {
    url: String,
    name: String,
  },
  setup(props) {
    const { url, name } = toRefs(props);
    const store = useStore();
    const getPokemonId = url.value?.split('/').slice(-2)[0];
    return {
      getPokemonName: name,
      getPokemonId,
      pokemon: computed(() => store.getters[types.GET_POKEMON_CONTENT](getPokemonId)),
    };
  },
});
</script>

<style lang="scss">

</style>
