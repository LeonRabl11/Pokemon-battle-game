import { useState } from "react";
import { usePokemons } from "../context";
import PokemonCard from "./PokemonCard";
import PokemonDetails from "./PokemonDetails";

const PokemonList = () => {
  const { loading, error, pokemons } = usePokemons();
  const [selectedPokemon, setSelectedPokemon] = useState<any | null>(null);

  return (
    <>
      <section
        id="pokemon"
        className="flex justify-center flex-wrap gap-4 px-[2rem] py-[3rem]"
      >
        {loading && (
          <p className="text-center font-medium text-4xl">Loading...</p>
        )}
        {error && (
          <p className="text-center text-red-500 font-semibold text-4xl">
            {error}
          </p>
        )}
        {!loading &&
          !error &&
          pokemons.map((pokemon) => (
            <div
              key={pokemon.name}
              onClick={() => setSelectedPokemon(pokemon)}
              className="cursor-pointer"
            >
              <PokemonCard {...pokemon} />
            </div>
          ))}
      </section>
      <PokemonDetails
        isOpen={!!selectedPokemon}
        onClose={() => setSelectedPokemon(null)}
      >
        {selectedPokemon && (
          <div className="flex flex-col items-center">
            <img
              src={selectedPokemon.image}
              alt={selectedPokemon.name}
              className="w-32 h-32 mb-4"
            />
            <h2 className="text-2xl font-bold capitalize mb-2 text-black">
              {selectedPokemon.name}
            </h2>
            <hr className="border-t border-gray-300 w-full my-2" />

            <p className="text-black">
              {`${selectedPokemon.stats[0].stat.name} `}:
              {` ${selectedPokemon.stats[0].base_stat} `}
            </p>
            <hr className="border-t border-gray-300 w-full my-2" />

            <p className="text-black">
              {`${selectedPokemon.stats[1].stat.name} `}:
              {` ${selectedPokemon.stats[1].base_stat} `}
            </p>
            <hr className="border-t border-gray-300 w-full my-2" />

            <p className="text-black">
              {`${selectedPokemon.stats[2].stat.name} `}:
              {` ${selectedPokemon.stats[2].base_stat} `}
            </p>
            <hr className="border-t border-gray-300 w-full my-2" />
            <button
              className="mt-4 bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-[1rem] font-semibold transition"
              onClick={() => {
                console.log(`${selectedPokemon.name} is ready to battle!`);
              }}
            >
              Battle
            </button>
          </div>
        )}
      </PokemonDetails>
    </>
  );
};
export default PokemonList;
