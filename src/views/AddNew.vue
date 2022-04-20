<template>
  <PokemonForm />
</template>

<script lang="ts">
import {
  defineComponent,
} from 'vue';
import PokemonForm from '@/components/PokemonForm.vue';

export default defineComponent({
  name: 'AddNew',
  components: {
    PokemonForm,
  },
  props: {
    newPokemon: {
      type: Object,
      default: () => ({}),
    },
  },
});
</script>
