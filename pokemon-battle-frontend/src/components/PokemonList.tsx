import { useState } from "react";
import { usePokemons } from "../context";
import PokemonCard from "./PokemonCard";
import PokemonDetails from "./PokemonDetails";

const PokemonList = () => {
  const { loading, error, pokemons, nextPage, prevPage, offset, total } =
    usePokemons();
  const [selectedPokemon, setSelectedPokemon] = useState<any | null>(null);

  return (
    <>
      <p
        className="
      text-yellow-400
      text-3xl
      uppercase
      font-bold
      tracking-wider
      drop-shadow-2xl
      mt-6
      transition-transform duration-300
      text-center
    "
        style={{
          fontFamily: "'Luckiest Guy', cursive",
          WebkitTextStroke: "1px #000080",
        }}
      >
        Choose Your Favourite Pokemon
      </p>

      <section className="flex flex-col items-center px-10 pt-6">
        <div className="flex flex-wrap justify-center gap-4 w-full">
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
        </div>

        <div className="flex gap-4 mt-6 justify-center w-full">
          <button
            onClick={prevPage}
            className="
      px-6 h-10 font-bold rounded-lg transition-colors duration-300
      bg-blue-600 hover:bg-blue-700 text-white
      disabled:bg-gray-300 disabled:text-gray-500
    "
            disabled={offset === 0}
          >
            Previous
          </button>

          <button
            onClick={nextPage}
            className="
      px-6 h-10 font-bold rounded-lg transition-colors duration-300
      bg-blue-600 hover:bg-blue-700 text-white
      disabled:bg-blue-300 disabled:disabled:text-gray-500
    "
            disabled={offset + 14 >= total}
          >
            Next
          </button>
        </div>
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
