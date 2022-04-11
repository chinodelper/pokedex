import { createStore, Commit } from 'vuex';
import * as types from './types';

type Pokemon = {
  name: string,
  url: string
}

type PokemonDetails = {
  types: Pokemon[],
  sprites: []
}

type pokemonSpeciesDetails = {
  flavorTextEntries: [],
}

interface IStatePokemon {
  pokemonList: Pokemon[],
  pokemonListDetails: PokemonDetails[],
  pokemonSpeciesDetails: pokemonSpeciesDetails[],
  nextPage: string,
  prevPage: string,
  errors: Array<string>,
  loading: null | boolean
}

type ErrorLog = {
  error: Error,
  label: string,
  type: string,
  visible: boolean,
  category?: string,
}

interface IErrors {
  errors: ErrorLog[]
}

export default createStore({
  state: {
    pokemonList: [],
    pokemonListDetails: [],
    pokemonSpeciesDetails: [],
    nextPage: '',
    prevPage: '',
    loading: null,
    errors: [],
  },
  getters: {
    [types.GET_PREV_PAGE]: (state: IStatePokemon) => state.prevPage,
    [types.GET_NEXT_PAGE]: (state: IStatePokemon) => state.nextPage,
    [types.GET_IS_LOADING]: (state: IStatePokemon) => state.loading,
    [types.GET_IS_LOADING]: (state: IStatePokemon) => state.loading,
    [types.GET_POKEMON]: (state: IStatePokemon) => state.pokemonList,
    [types.GET_POKEMON_SPECIES]: (state: IStatePokemon) => state.pokemonSpeciesDetails,
    [types.GET_IS_DATA_STORED]: (state: IStatePokemon) => state.pokemonListDetails.length === 0,
    [types.GET_POKEMON_CONTENT]:
      (state: IStatePokemon) => (id: number) => state.pokemonListDetails[id - 1],
  },
  mutations: {
    [types.MUTATE_SET_POKEMON]: (state: IStatePokemon, payload: []) => {
      state.pokemonList = payload; // save pokemon list
      state.loading = false; // Loading finished
    },
    [types.MUTATE_SET_PREV_PAGE]: (state: IStatePokemon, payload: string) => {
      state.prevPage = payload; // save pokemon list
      state.loading = false; // Loading finished
    },
    [types.MUTATE_SET_NEXT_PAGE]: (state: IStatePokemon, payload: string) => {
      state.nextPage = payload; // save pokemon list
      state.loading = false; // Loading finished
    },
    [types.MUTATE_SET_POKEMON_CONTENT]: (state: IStatePokemon, payload: PokemonDetails) => {
      state.pokemonListDetails.push(payload); // save pokemon list details
      state.loading = false; // Loading finished
    },
    [types.MUTATE_SET_POKEMON_SPECIES]: (state: IStatePokemon, payload: []) => {
      state.pokemonSpeciesDetails = payload; // save pokemon species details
      state.loading = false; // Loading finished
    },
    [types.MUTATE_SET_ERRORS]: (state:IErrors, payload:ErrorLog) => {
      state.errors.push(payload);
      const error = payload.error || ' - [HTTP error not specified]';
      // eslint-disable-next-line no-console
      console.warn(payload.label, error);
    },
  },
  actions: {
    [types.SET_POKEMON]: ({ commit, state }:
      { commit: Commit, state: IStatePokemon }, payload: []) => {
      state.loading = true; // Start Loading
      commit(types.MUTATE_SET_POKEMON, payload);
    },
    [types.SET_POKEMON_CONTENT]: ({ commit, state }:
      { commit: Commit, state: IStatePokemon }, payload: []) => {
      state.loading = true; // Start Loading
      commit(types.MUTATE_SET_POKEMON_CONTENT, payload);
    },
    [types.SET_POKEMON_SPECIES]: ({ commit, state }:
      { commit: Commit, state: IStatePokemon }, payload: []) => {
      state.loading = true; // Start Loading
      commit(types.MUTATE_SET_POKEMON_SPECIES, payload);
    },
    [types.SET_NEXT_PAGE]: ({ commit, state }:
      { commit: Commit, state: IStatePokemon }, payload: []) => {
      state.loading = true; // Start Loading
      commit(types.MUTATE_SET_NEXT_PAGE, payload);
    },
    [types.SET_PREV_PAGE]: ({ commit, state }:
      { commit: Commit, state: IStatePokemon }, payload: []) => {
      state.loading = true; // Start Loading
      commit(types.MUTATE_SET_PREV_PAGE, payload);
    },
    [types.SET_ERRORS]: async (
      { commit }:{ commit: Commit },
      payload:ErrorLog,
    ) => {
      commit(types.MUTATE_SET_ERRORS, payload);
    },
  },
});
