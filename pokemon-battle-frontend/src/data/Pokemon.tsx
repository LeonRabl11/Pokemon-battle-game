const API_URL = "https://pokeapi.co/api/v2/pokemon?limit=15";

const getAllPokemons = async (abortCont: AbortController) => {
  const res = await fetch(API_URL, {
    signal: abortCont.signal,
  });

  if (!res.ok) throw new Error(`${res.status}. Something went wrong!`);

  const data = await res.json();

  return data;
};

export { getAllPokemons };
