import { createStore, Commit } from 'vuex';
import * as types from './types';

type Pokemon = {
  name: string,
  url: string
}

interface IStatePokemon {
  pokemon: Pokemon[];
  errors: Array<string>;
  loading: null | boolean;
}

export default createStore({
  state: {
    pokemon: [],
    loading: null,
    errors: [],
  },
  getters: {
    [types.GET_POKEMON]: (state: IStatePokemon) => state.pokemon,
  },
  mutations: {
    [types.MUTATE_SET_POKEMON]: (state: IStatePokemon, payload: []) => {
      state.pokemon = payload; // save pokemon list
      state.loading = false; // Loading finished
    },
  },
  actions: {
    [types.SET_POKEMON]: ({ commit, state }:
      { commit: Commit, state: IStatePokemon }, payload: []) => {
      state.loading = true; // Start Loading
      commit(types.MUTATE_SET_POKEMON, payload);
    },
  },
});
