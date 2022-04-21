<template>
  <nav class="mt-5" aria-label="breadcrumb">
    <ol class="breadcrumb">
      <li class="breadcrumb-item">
        <a href="#" @click.prevent="goHome">Home</a>
      </li>
      <li
        class="breadcrumb-item active"
        aria-current="page">
          {{ pokemon }}
      </li>
    </ol>
  </nav>
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
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import * as types from '@/store/types';
import PokemonCardFullContent from '@/components/PokemonCardFullContent.vue';

export default defineComponent({
  name: 'Pokemon',
  components: {
    PokemonCardFullContent,
  },
  setup() {
    const store = useStore(); // inject vuex
    const route = useRoute();
    const router = useRouter();
    const { pokemon } = route.params;
    const goHome = () => {
      store.dispatch(types.SET_CLEAR_CONTENT);
      router.push({
        name: 'Home',
        query: {
          ...route.query,
        },
      });
    };
    return {
      pokemon,
      goHome,
    };
  },
});
</script>
