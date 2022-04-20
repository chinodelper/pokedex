<template>
  <div class="alert alert-danger mt-5" role="alert">
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
