const API_URL = "https://pokeapi.co/api/v2/pokemon";

const getAllPokemons = async (
  abortCont: AbortController,
  offset: number,
  limit: number
) => {
  const res = await fetch(`${API_URL}?offset=${offset}&limit=${limit}`, {
    signal: abortCont.signal,
  });

  if (!res.ok) throw new Error(`${res.status}. Something went wrong!`);

  const data = await res.json();

  return data;
};

export { getAllPokemons };
