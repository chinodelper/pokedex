<template>
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
