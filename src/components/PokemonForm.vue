<template>
  <form>
    <div class="mb-3">
      <label for="name" class="form-label">Name</label>
      <input
        id="name"
        v-model="newPkemon.name"
        type="text"
        class="form-control"
        aria-describedby="name" />
    </div>

    <div class="mb-3">
      <label for="image" class="form-label">Image URL</label>
      <input
        id="image"
        v-model="newPkemon.image"
        type="text"
        class="form-control"
        aria-describedby="name" />
    </div>

    <div class="mb-3">
      <label for="description" class="form-label">Description</label>
      <textarea
        id="description"
        v-model="newPkemon.description"
        class="form-control"
        aria-describedby="description" />
    </div>

    <label for="types" class="form-label">Type/s</label>
    <div class="list-group">
      <label
        v-for="type in typesList"
        :key="type"
        :for="type"
        class="list-group-item">
        <input
          :id="type"
          v-model="newPkemon.type"
          class="form-check-input me-1"
          type="checkbox"
          :value="type">
          <p> {{ type }} </p>
      </label>

    </div>

    <button type="submit" class="btn btn-primary" @click.prevent="addNew">Add</button>
  </form>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
} from 'vue';

export default defineComponent({
  name: 'PokemonForm',
  setup() {
    const typesList = [
      'grass',
      'poison',
      'fire',
      'flying',
      'water',
    ];
    const state = reactive({
      newPkemon: {
        name: '',
        description: '',
        image: '',
        type: [],
      },
    });
    const addNew = () => console.log(state.newPkemon);
    return {
      ...toRefs(state),
      addNew,
      typesList,
    };
  },
});
</script>

<style lang="scss" scoped>
  .list-group-item {
    p {
      display: inline-block;
      &::first-letter {
        text-transform:capitalize;
      }
    }
  }
</style>
