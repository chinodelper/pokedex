export type Pokemon = {
  name: string,
  url: string
}

export type PokemonContent = {
  id: number,
  types: any,
  sprites: any
}

export type PokemonSpeciesContent = {
  flavorTextEntries: [],
}

export interface IStatePokemon {
  pokemonList: storetypes.Pokemon[],
  pokemonListContent: storetypes.PokemonContent[],
  pokemonSpeciesContent: PokemonSpeciesContent[],
  nextPage: string,
  prevPage: string,
  errors: Array<string>,
  loading: null | boolean
}

export type ErrorLog = {
  error: Error,
  label: string,
  type: string,
  visible: boolean,
  category?: string,
}

export interface IErrors {
  errors: ErrorLog[]
}
