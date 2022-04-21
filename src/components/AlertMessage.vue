<template>
  <div class="alert alert-warning alert-dismissible fade show mt-5" role="alert">
    <svg
      class="bi flex-shrink-0 me-2"
      width="24"
      height="24"
      role="img"
      aria-label="Danger:">
        <use xlink:href="#exclamation-triangle-fill"/>
    </svg>
    {{ errorTxt }}
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
} from 'vue';

export default defineComponent({
  name: 'AlertMessage',
  props: {
    errorTxt: String,
  },
});
</script>
