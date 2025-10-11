import { useEffect, useState } from "react";
import { useBattle } from "../context/BattleContext";
import type { BattlePokemon } from "../types";
import { getAllPokemons } from "../data";
import type { ApiStat } from "../types";
import { useAuth } from "../context/AuthContext"; 

const Battle = () => {
  const { playerPokemon } = useBattle();
  const [computerPokemon, setComputerPokemon] = useState<BattlePokemon | null>(null);
  const [result, setResult] = useState<null | "win" | "lose">(null);
  const [xp, setXp] = useState(0);
  const { user } = useAuth(); // current used token

  // load random enemy 
  const fetchRandomPokemon = async () => {
    const data = await getAllPokemons(new AbortController(), 0, 100);
    const randomIndex = Math.floor(Math.random() * data.results.length);
    const poke = data.results[randomIndex];

    const res = await fetch(poke.url);
    const details = await res.json();

    const newPokemon: BattlePokemon = {
      name: details.name,
      image: details.sprites.front_default,
      stats: (details.stats as ApiStat[]).map((stat) => ({
        base_stat: stat.base_stat,
        stat: { name: stat.stat.name },
      })),
    };

    setComputerPokemon(newPokemon);
  };

  useEffect(() => {
    fetchRandomPokemon();
  }, []);

  if (!playerPokemon || !computerPokemon) return <p>Loading Battle...</p>;

  const statColors: Record<string, string> = {
    hp: "bg-red-500",
    attack: "bg-yellow-400",
    defense: "bg-blue-500",
    "special-attack": "bg-sky-400",
    "special-defense": "bg-purple-400",
    speed: "bg-green-500",
  };

  const renderStats = (stats: BattlePokemon["stats"]) =>
    stats.map((s) => (
      <div key={s.stat.name} className="flex items-center justify-between">
        <div className="flex items-center gap-2 capitalize">
          <span
            className={`inline-block w-3 h-3 rounded-full ${
              statColors[s.stat.name] || "bg-gray-400"
            }`}
          ></span>
          <span className="font-semibold">{s.stat.name}</span>
        </div>
        <span>{s.base_stat}</span>
      </div>
    ));

  const getTotalStats = (pokemon: BattlePokemon) =>
    pokemon.stats.reduce((sum, s) => sum + s.base_stat, 0);

  const handleBattle = async () => {
    const playerTotal = getTotalStats(playerPokemon);
    const computerTotal = getTotalStats(computerPokemon);

    const amount = playerTotal > computerTotal ? 100 : -50;
    const newResult = playerTotal > computerTotal ? "win" : "lose";

    setResult(newResult);

    // send xp to backend 
    if (user?.token) {
      try {
        const res = await fetch("http://localhost:5000/api/users/xp", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({ amount }),
        });

        if (!res.ok) throw new Error("Failed to update XP");

        const data = await res.json();
        setXp(data.xp); // curren xp from backend 
      } catch (err) {
        console.error("Fehler beim Aktualisieren der XP:", err);
      }
    } else {
      // fallback: lokal actualisation
      setXp((prev) => Math.max(prev + amount, 0));
    }

    fetchRandomPokemon();
  };

  return (
    <div className="flex flex-col items-center mt-12 text-white">
      <h1
        className="
          text-yellow-400 text-3xl uppercase font-bold tracking-wider
          drop-shadow-2xl mt-6 mb-6 text-center
        "
        style={{
          fontFamily: "'Luckiest Guy', cursive",
          WebkitTextStroke: "1px #000080",
        }}
      >
        Pokemon Battle
      </h1>

      <div className="mb-4 text-xl font-semibold">
        Your XP: <span className="text-yellow-400">{xp}</span>
      </div>

      <div className="flex justify-center gap-32 mb-8">
        {/* Player */}
        <div className="flex flex-col items-center">
          <h2 className="text-xl font-bold mb-2">Your Pokemon</h2>
          <div className="card bg-base-100 w-80 shadow-md text-white">
            <figure className="bg-gray-100 p-4">
              <img src={playerPokemon.image} alt={playerPokemon.name} className="w-48 h-48 object-contain" />
            </figure>
            <div className="card-body">
              <h2 className="card-title capitalize justify-center">{playerPokemon.name}</h2>
              <div className="space-y-1">{renderStats(playerPokemon.stats)}</div>
            </div>
          </div>
        </div>

        {/* Computer */}
        <div className="flex flex-col items-center">
          <h2 className="text-xl font-bold mb-2">Enemy</h2>
          <div className="card bg-base-100 w-80 shadow-md text-white">
            <figure className="bg-gray-100 p-4">
              <img src={computerPokemon.image} alt={computerPokemon.name} className="w-48 h-48 object-contain" />
            </figure>
            <div className="card-body">
              <h2 className="card-title capitalize justify-center">{computerPokemon.name}</h2>
              <div className="space-y-1">{renderStats(computerPokemon.stats)}</div>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={handleBattle}
        className="bg-red-600 hover:bg-red-500 text-white font-bold py-3 px-8 rounded transition-colors"
      >
        Start Fight
      </button>

      {result && (
        <div className="mt-6 text-3xl font-bold drop-shadow-lg">
          {result === "win" ? (
            <span className="text-green-400">
              Win! <span className="text-white text-2xl font-semibold">+100 XP</span>
            </span>
          ) : (
            <span className="text-red-500">
              Defeat! <span className="text-white text-2xl font-semibold">-50 XP</span>
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default Battle;
