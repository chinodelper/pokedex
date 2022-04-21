import { createStore, Commit } from 'vuex';
import * as storetypes from '../types/store.d';
import * as types from './types';

export default createStore({
  state: {
    pokemonList: [],
    pokemonListContent: [],
    pokemonSpeciesContent: [],
    nextPage: '',
    prevPage: '',
    loading: null,
    errors: [],
  },
  getters: {
    [types.GET_PREV_PAGE]: (state: storetypes.IStatePokemon) => state.prevPage,
    [types.GET_NEXT_PAGE]: (state: storetypes.IStatePokemon) => state.nextPage,
    [types.GET_IS_LOADING]: (state: storetypes.IStatePokemon) => state.loading,
    [types.GET_ERRORS]: (state: storetypes.IStatePokemon) => state.errors,
    [types.GET_POKEMON]: (state: storetypes.IStatePokemon) => state.pokemonList,
    [types.GET_POKEMON_LIST_CONTENT]: (state: storetypes.IStatePokemon) => state.pokemonListContent,
    [types.GET_POKEMON_SPECIES]: (state: storetypes.IStatePokemon) => state.pokemonSpeciesContent,
    [types.GET_IS_DATA_STORED]: (state: storetypes.IStatePokemon) => state
      .pokemonListContent.length === 0,
    [types.GET_POKEMON_CONTENT]:
      (state: storetypes.IStatePokemon) => (id: number) => {
        const idInt = Number(id);
        const item = state.pokemonListContent
          .find((el) => el?.id === idInt);
        return item;
      },
  },
  mutations: {
    [types.MUTATE_SET_POKEMON]: (state: storetypes.IStatePokemon, payload: []) => {
      state.pokemonList = payload; // save pokemon list
      state.loading = false; // Loading finished
    },
    [types.MUTATE_SET_ADD_NEW_POKEMON]: (state: storetypes.IStatePokemon,
      payload: {
        id: number,
        name: string,
        sprites: string,
        description: string,
        types: any,
        height: number,
        weight: number,
      }) => {
      const item = {
        name: payload.name,
        url: `https://pokeapi.co/api/v2/pokemon/${payload.id}/`,
      };

      // Build the new structure to add payload
      const itemTypes: any = [];
      payload.types.forEach((element: string) => itemTypes.push({ type: { name: element } }));
      const itemContent = {
        id: payload.id,
        types: itemTypes,
        sprites: {
          other: {
            home: {
              front_default: payload.sprites,
            },
          },
        },
        name: payload.name,
        height: payload.height,
        weight: payload.weight,
        description: payload.description,
      };

      // Set new data into current store
      state.pokemonList.push(item); // save pokemon list
      state.pokemonListContent.push(itemContent); // save pokemon content
      state.loading = false; // Loading finished
    },
    [types.MUTATE_SET_PREV_PAGE]: (state: storetypes.IStatePokemon, payload: string) => {
      state.prevPage = payload; // save pokemon list
      state.loading = false; // Loading finished
    },
    [types.MUTATE_SET_NEXT_PAGE]: (state: storetypes.IStatePokemon, payload: string) => {
      state.nextPage = payload; // save pokemon list
      state.loading = false; // Loading finished
    },
    [types.MUTATE_SET_POKEMON_CONTENT]: (
      state: storetypes.IStatePokemon,
      payload: storetypes.PokemonContent,
    ) => {
      state.pokemonListContent[payload.id - 1] = payload; // save pokemon list details
      // state.pokemonListContent.push(payload); // save pokemon list details
      state.loading = false; // Loading finished
    },
    [types.MUTATE_SET_POKEMON_SPECIES]: (state: storetypes.IStatePokemon, payload: []) => {
      state.pokemonSpeciesContent = payload; // save pokemon species details
      state.loading = false; // Loading finished
    },
    [types.MUTATE_SET_START_LOADING]: (state: storetypes.IStatePokemon) => {
      state.loading = true; // Loading finished
    },
    [types.MUTATE_SET_CLEAR_CONTENT]: (state: storetypes.IStatePokemon) => {
      state.pokemonSpeciesContent = []; // clear species content
    },
    [types.MUTATE_SET_ERRORS]: (state:storetypes.IErrors, payload:storetypes.ErrorLog) => {
      state.errors.push(payload);
      const error = payload.error || ' - [HTTP error not specified]';
      // eslint-disable-next-line no-console
      console.warn(payload.label, error);
    },
  },
  actions: {
    [types.SET_ADD_NEW_POKEMON]: ({ commit }:
      { commit: Commit }, payload: []) => {
      commit(types.MUTATE_SET_ADD_NEW_POKEMON, payload);
      commit(types.MUTATE_SET_CLEAR_CONTENT);
    },
    [types.SET_POKEMON]: ({ commit }:
      { commit: Commit, state: storetypes.IStatePokemon }, payload: []) => {
      commit(types.MUTATE_SET_POKEMON, payload);
    },
    [types.SET_POKEMON_CONTENT]: ({ commit }:
      { commit: Commit, state: storetypes.IStatePokemon }, payload: []) => {
      commit(types.MUTATE_SET_POKEMON_CONTENT, payload);
    },
    [types.SET_POKEMON_SPECIES]: ({ commit }:
      { commit: Commit }, payload: []) => {
      commit(types.MUTATE_SET_POKEMON_SPECIES, payload);
    },
    [types.SET_NEXT_PAGE]: ({ commit, state }:
      { commit: Commit, state: storetypes.IStatePokemon }, payload: []) => {
      state.pokemonListContent = []; // reset list content
      commit(types.MUTATE_SET_NEXT_PAGE, payload);
    },
    [types.SET_PREV_PAGE]: ({ commit, state }:
      { commit: Commit, state: storetypes.IStatePokemon }, payload: []) => {
      state.pokemonListContent = []; // reset list content
      commit(types.MUTATE_SET_PREV_PAGE, payload);
    },
    [types.SET_START_LOADING]: ({ commit }:
      { commit: Commit }) => {
      commit(types.MUTATE_SET_START_LOADING);
    },
    [types.SET_CLEAR_CONTENT]: ({ commit }:
      { commit: Commit }) => {
      commit(types.MUTATE_SET_CLEAR_CONTENT);
    },
    [types.SET_ERRORS]: async (
      { commit }:{ commit: Commit },
      payload:storetypes.ErrorLog,
    ) => {
      commit(types.MUTATE_SET_ERRORS, payload);
    },
  },
});
