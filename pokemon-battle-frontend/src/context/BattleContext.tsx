import { createContext, useContext, useState, type ReactNode } from "react";
import type { BattlePokemon } from "../types";

type BattleContextType = {
  playerPokemon: BattlePokemon | null;
  setPlayerPokemon: (pokemon: BattlePokemon) => void;
};

const BattleContext = createContext<BattleContextType | null>(null);

export const BattleProvider = ({ children }: { children: ReactNode }) => {
  const [playerPokemon, setPlayerPokemon] = useState<BattlePokemon | null>(null);

  return (
    <BattleContext.Provider value={{ playerPokemon, setPlayerPokemon }}>
      {children}
    </BattleContext.Provider>
  );
};

export const useBattle = () => {
  const context = useContext(BattleContext);
  if (!context) throw new Error("useBattle must be used within a BattleProvider");
  return context;
};

