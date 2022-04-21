<template>
  <nav class="mt-5" aria-label="breadcrumb">
    <ol class="breadcrumb">
      <li class="breadcrumb-item">
        <a href="#" @click.prevent="goHome">Home</a>
      </li>
      <li
        class="breadcrumb-item active"
        aria-current="page">
          {{ item }}
      </li>
    </ol>
  </nav>
</template>

<script lang="ts">
import {
  defineComponent,
} from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import * as types from '@/store/types';

export default defineComponent({
  name: 'AlertMessage',
  props: {
    item: String,
  },
  setup() {
    const store = useStore(); // inject vuex
    const route = useRoute();
    const router = useRouter();
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
      goHome,
    };
  },
});
</script>
