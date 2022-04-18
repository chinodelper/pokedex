<template>
  <span
    class="badge rounded-pill mx-1"
    :class="[
      { 'bg-danger' : types.type.name ===  'poison'},
      { 'bg-success' : types.type.name ===  'grass'},
      { 'bg-warning text-dark' : types.type.name ===  'fire'},
      { 'bg-info' : types.type.name ===  'water'},
      { 'bg-dark' : types.type.name ===  'bug'},
      { 'bg-secondary' : types.type.name ===  'normal'},
      { 'bg-primary' : types.type.name ===  'flying'},
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
