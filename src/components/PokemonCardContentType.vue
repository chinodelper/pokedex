<template>
  <span
    class="badge rounded-pill mx-1"
    :class="[
      { 'bg-danger' : types.type.name ===  'poison' || types.type.name === 'steel'},
      { 'bg-success' : types.type.name ===  'grass' || types.type.name === 'psychic'},
      { 'bg-warning text-dark' : types.type.name ===  'fire' || types.type.name ===  'electric'},
      { 'bg-info' : types.type.name ===  'water' || types.type.name === 'ice' },
      { 'bg-dark' : types.type.name ===  'bug' || types.type.name ===  'ground'},
      { 'bg-secondary' : types.type.name ===  'normal'
        || types.type.name === 'fighting'
        || types.type.name === 'rock'
        || types.type.name === 'ghost' },
      { 'bg-primary' : types.type.name ===  'flying' || types.type.name === 'fairy'},
    ]"
    v-for="types in list" :key="types?.type">
      {{ types.type.name }}
  </span>
</template>

<script lang="ts">
import {
  defineComponent,
  toRefs,
} from 'vue';

export default defineComponent({
  name: 'PokemonCardContentType',
  props: {
    typesList: Array,
  },
  setup(props) {
    const { typesList } = toRefs(props);
    return {
      list: typesList,
    };
  },
});
</script>
