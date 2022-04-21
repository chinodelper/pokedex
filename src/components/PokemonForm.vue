<template>
  <Breadcrumbs item="New" />
  <AlertMessage v-show="showError" :errorTxt="getError" />
  <form class="mt-5">
    <div class="row">
      <div class="col">
        <div class="input-group mb-3">
          <span class="input-group-text">
            <label for="id">Id</label>
          </span>
          <input
            id="name"
            v-model="newPokemon.id"
            type="number"
            class="form-control"
            aria-describedby="id" />
        </div>

        <div class="input-group mb-3">
          <span class="input-group-text">
            <label for="name">Name</label>
          </span>
          <input
            id="name"
            v-model="newPokemon.name"
            type="text"
            class="form-control"
            aria-describedby="name" />
        </div>

        <div class="row">
          <div class="col">
            <div class="input-group mb-3">
              <span class="input-group-text">
                <label for="height">Height</label>
              </span>
              <input
                id="height"
                v-model="newPokemon.height"
                type="number"
                class="form-control"
                aria-describedby="height" />
            </div>
          </div>
          <div class="col">
            <div class="input-group mb-3">
              <span class="input-group-text">
                <label for="weight">Weight</label>
              </span>
              <input
                id="height"
                v-model="newPokemon.weight"
                type="number"
                class="form-control"
                aria-describedby="weight" />
            </div>
          </div>
        </div>

        <div class="input-group mb-3">
          <span class="input-group-text">
            <label for="image">Image URL</label>
          </span>
          <input
            id="image"
            v-model="newPokemon.sprites"
            type="text"
            class="form-control"
            aria-describedby="name" />
        </div>

        <div class="input-group mb-3">
          <span class="input-group-text">
            <label for="description">Description</label>
          </span>
          <textarea
            id="description"
            v-model="newPokemon.description"
            class="form-control"
            aria-describedby="description" />
        </div>
      </div>
      <div class="col">
        <div class="list-group">
          <label
            v-for="type in typesList"
            :key="type"
            :for="type"
            class="list-group-item">
            <input
              :id="type"
              v-model="newPokemon.types"
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
import { useRouter, useRoute } from 'vue-router';
import AlertMessage from '@/components/AlertMessage.vue';
import Breadcrumbs from '@/components/Breadcrumbs.vue';
import { useStore } from 'vuex';
import * as types from '@/store/types';

export default defineComponent({
  name: 'PokemonForm',
  components: {
    AlertMessage,
    Breadcrumbs,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const store = useStore();
    const typesList = [
      'grass',
      'poison',
      'fire',
      'flying',
      'water',
    ];
    const state = reactive({
      getError: '',
      showError: false,
      newPokemon: {
        id: null,
        name: '',
        height: null,
        weight: null,
        description: '',
        sprites: '',
        types: [],
      },
    });
    const addNew = () => {
      state.getError = ''; // reset error flag
      state.showError = false;
      if (state.newPokemon.id !== '' && state.newPokemon.name !== '') {
        store.dispatch(types.SET_START_LOADING); // Start loading
        store.dispatch(types.SET_ADD_NEW_POKEMON, state.newPokemon);
        router.push({
          name: 'Home',
          query: {
            ...route.query,
          },
        });
      } else {
        state.getError = 'Complete empty fields, please.';
        state.showError = true;
      }
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
