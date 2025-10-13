import { createContext, useContext } from "react";
import PokemonProvider from "./PokemonProvider";
import type { PokemonContextType } from "../types";

const PokemonContext = createContext<PokemonContextType | undefined>(undefined);

const usePokemons = () => {
  const context = useContext(PokemonContext);
  if (!context)
    throw new Error("usePokemons must be used within a PokemonContext");
  return context;
};

export { PokemonContext, usePokemons, PokemonProvider };
