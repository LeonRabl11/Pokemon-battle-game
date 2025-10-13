import { useState, useEffect, type ReactNode } from "react";
import { getAllPokemons } from "../data";
import { PokemonContext } from ".";
import type { Pokemon } from "../types";

type PokemonProvicerProps = {
  children: ReactNode;
};

const PokemonProvider = ({ children }: PokemonProvicerProps) => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [offset, setOffset] = useState(0);
  const limit = 16;
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const abortController = new AbortController();
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getAllPokemons(abortController, offset, limit);
        setTotal(data.count);

        console.log("data from getAllPokemons:", data);
        if (!data || !data.results) {
          throw new Error("Pokémon data is missing 'results' field");
        }
        const details = await Promise.all(
          data.results.map(async (p: any) => {
            const res = await fetch(p.url);
            const info = await res.json();
            return {
              name: info.name,
              image: info.sprites.front_default,
              stats: info.stats,
            };
          })
        );
        console.log(details);
        setPokemons(details);
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
          console.info("Fetch Aborted");
        } else {
          console.error(error);
          setError("Error bringing pokemons.");
        }
      } finally {
        setLoading(false);
      }
    })();

    return () => {
      abortController.abort();
    };
  }, [offset]);

  const nextPage: () => void = () => {
    console.log("clicked");
    if (offset + limit < total) setOffset((prev) => prev + limit);
  };

  const prevPage: () => void = () => {
    if (offset - limit >= 0) setOffset((prev) => prev - limit);
  };
  return (
    <PokemonContext.Provider
      value={{
        pokemons,
        setPokemons,
        loading,
        error,
        nextPage,
        prevPage,
        offset,
        total,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};

export default PokemonProvider;
