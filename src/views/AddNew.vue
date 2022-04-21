<template>
  <Breadcrumbs item="New" />
  <PokemonForm />
</template>

<script lang="ts">
import {
  defineComponent,
} from 'vue';
import Breadcrumbs from '@/components/Breadcrumbs.vue';
import PokemonForm from '@/components/PokemonForm.vue';

export default defineComponent({
  name: 'AddNew',
  components: {
    PokemonForm,
    Breadcrumbs,
  },
});
</script>
