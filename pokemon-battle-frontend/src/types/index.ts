import type { Dispatch, SetStateAction } from "react";

export type DBEntry = {
  _id: string;
  createdAt: string;
  __v: number;
};
type stats = {
  base_stat: number;
  stat: {
    name: string;
  };
};

export type Pokemon = DBEntry & {
  name: string;
  image: string;
  stats: stats[];
};

export type PokemonContextType = {
  pokemons: Pokemon[];
  setPokemons: Dispatch<SetStateAction<Pokemon[]>>;
  loading: boolean;
  error: string | null;
  nextPage: () => void;
  prevPage: () => void;
  offset: number;
  total: number;
};
