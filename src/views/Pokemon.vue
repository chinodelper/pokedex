<template>
  <Breadcrumbs :item="pokemon" />
  <div class="card my-3">
    <div class="row g-0 align-items-center">
      <PokemonCardFullContent />
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
} from 'vue';
import { useRoute } from 'vue-router';
import PokemonCardFullContent from '@/components/PokemonCardFullContent.vue';
import Breadcrumbs from '@/components/Breadcrumbs.vue';

export default defineComponent({
  name: 'Pokemon',
  components: {
    PokemonCardFullContent,
    Breadcrumbs,
  },
  setup() {
    const route = useRoute();
    const { pokemon } = route.params;
    return {
      pokemon,
    };
  },
});
</script>
