<template>
  <div class="card mb-3">
    <div class="row g-0">
      <PokemonCardFullContent />
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
} from 'vue';
import PokemonCardFullContent from '@/components/PokemonCardFullContent.vue';

export default defineComponent({
  name: 'Pokemon',
  components: {
    PokemonCardFullContent,
  },
});
</script>

<style lang="scss">

</style>
