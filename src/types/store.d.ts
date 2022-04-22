export type Pokemon = {
  name: string,
  url: string
}

export type PokemonContent = {
  id: number,
  types: {
    type: {
      name: string,
    },
  }[],
  sprites: {
    other: {
      home: {
        // eslint-disable-next-line camelcase
        front_default: string,
      },
    },
  },
  name?: string,
  height?: number,
  weight?: number,
  description?: string,
}

export type PokemonSpeciesContent = {
  flavorTextEntries: [],
}

export interface IStatePokemon {
  pokemonList: Pokemon[],
  pokemonListContent: PokemonContent[],
  pokemonSpeciesContent: PokemonSpeciesContent[],
  nextPage: string,
  prevPage: string,
  errors: string[],
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
