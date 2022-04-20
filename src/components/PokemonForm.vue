<template>
  <form class="mt-5">
    <h3 class="mb-5">Write new data for a new Pokemon</h3>
    <div class="row">
      <div class="col">
        <div class="mb-3">
          <label for="id" class="form-label">Id</label>
          <input
            id="name"
            v-model="newPkemon.id"
            type="number"
            class="form-control"
            aria-describedby="id" />
        </div>

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
            v-model="newPkemon.sprites"
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
      </div>
      <div class="col">
        <label for="types" class="form-label">Type/s</label>
        <div class="list-group">
          <label
            v-for="type in typesList"
            :key="type"
            :for="type"
            class="list-group-item">
            <input
              :id="type"
              v-model="newPkemon.types"
              class="form-check-input me-1"
              type="checkbox"
              :value="type">
              <p> {{ type }} </p>
          </label>
        </div>
      </div>
    </div>
    <button
      type="submit"
      class="btn btn-primary mt-5"
      @click.prevent="addNew">
        Add New Pokemon
    </button>
  </form>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
} from 'vue';
import { useStore } from 'vuex';
import * as types from '@/store/types';

export default defineComponent({
  name: 'PokemonForm',
  setup() {
    const store = useStore();
    const typesList = [
      'grass',
      'poison',
      'fire',
      'flying',
      'water',
    ];
    const state = reactive({
      newPkemon: {
        id: undefined,
        name: '',
        description: '',
        sprites: '',
        types: [],
      },
    });
    const addNew = () => {
      store.dispatch(types.SET_ADD_NEW_POKEMON, state.newPkemon);
    };
    return {
      typesList,
      addNew,
      ...toRefs(state),
    };
  },
});
</script>

<style lang="scss" scoped>
  .form-label {
    font-weight: bold;
  }
  .list-group-item {
    p {
      display: inline-block;
      &::first-letter {
        text-transform:capitalize;
      }
    }
  }
</style>
