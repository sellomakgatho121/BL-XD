"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Play, RotateCcw, Flame, Shield } from "lucide-react";

type CellState = "susceptible" | "infected" | "recovered";

const GRID_SIZE = 12;
const CELL_COUNT = GRID_SIZE * GRID_SIZE;

export default function MemeticSimulator() {
  const [grid, setGrid] = useState<CellState[]>(Array(CELL_COUNT).fill("susceptible"));
  const [isRunning, setIsRunning] = useState(false);
  const [virality, setVirality] = useState(0.6);
  const [resistance, setResistance] = useState(0.1);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const resetGrid = useCallback(() => {
    setGrid(Array(CELL_COUNT).fill("susceptible"));
    setIsRunning(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, []);

  const toggleCell = (index: number) => {
    const newGrid = [...grid];
    newGrid[index] = newGrid[index] === "infected" ? "susceptible" : "infected";
    setGrid(newGrid);
  };

  const stepSimulation = useCallback(() => {
    setGrid((prevGrid) => {
      const nextGrid = [...prevGrid];
      let infectedCount = 0;

      for (let i = 0; i < CELL_COUNT; i++) {
        const state = prevGrid[i];

        if (state === "infected") {
          // Simple rule: 30% chance to recover per tick
          if (Math.random() < 0.3) {
            nextGrid[i] = "recovered";
          }
          infectedCount++;
        } else if (state === "susceptible") {
          const neighbors = [
            i - 1, i + 1,
            i - GRID_SIZE, i + GRID_SIZE
          ].filter(n => n >= 0 && n < CELL_COUNT);

          const infectedNeighbors = neighbors.filter(n => prevGrid[n] === "infected").length;

          const infectionChance = (virality * (infectedNeighbors * 0.5)) - resistance;

          if (infectedNeighbors > 0 && Math.random() < infectionChance) {
            nextGrid[i] = "infected";
          }
        } else if (state === "recovered") {
          if (Math.random() < 0.05) {
            nextGrid[i] = "susceptible";
          }
        }
      }

      if (infectedCount === 0 && prevGrid.some(c => c === "recovered")) {
        setIsRunning(false);
      }

      return nextGrid;
    });
  }, [virality, resistance]);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(stepSimulation, 200);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, stepSimulation]);

  useEffect(() => {
    const seed = Array(CELL_COUNT).fill("susceptible");
    seed[Math.floor(CELL_COUNT / 2) + GRID_SIZE / 2] = "infected";
    setGrid(seed);
  }, []);

  return (
    <div className="relative h-96 w-full max-w-sm rounded-xl bg-[var(--onyx)]/40 border border-[var(--neo-white)]/10 overflow-hidden flex flex-col backdrop-blur-sm group">
      <div className="p-4 border-b border-[var(--neo-white)]/5 bg-[var(--neo-white)]/5 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Flame className="text-[var(--siren-red)]" size={16} />
          <span className="text-xs font-bold text-[var(--neo-white)] tracking-widest">MEMETIC_SIMULATOR</span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`p-1.5 rounded hover:bg-[var(--neo-white)]/10 transition-colors ${isRunning ? 'text-[var(--signal-lime)]' : 'text-[var(--neo-white)]/60'}`}
          >
            <Play size={12} fill="currentColor" />
          </button>
          <button
            onClick={resetGrid}
            className="p-1.5 rounded hover:bg-[var(--neo-white)]/10 transition-colors text-[var(--neo-white)]/60"
          >
            <RotateCcw size={12} />
          </button>
        </div>
      </div>

      <div className="p-6 flex-1 flex flex-col gap-6">
        <div
          className="flex-1 grid gap-1"
          style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)` }}
        >
          {grid.map((state, i) => (
            <div
              key={i}
              onClick={() => toggleCell(i)}
              className={`rounded-sm cursor-pointer transition-colors duration-300 ${state === "infected" ? "bg-[var(--siren-red)] shadow-[0_0_8px_rgba(255,51,102,0.8)]" :
                  state === "recovered" ? "bg-[#3b82f6]/20" :
                    "bg-[var(--neo-white)]/5 hover:bg-[var(--neo-white)]/10"
                } active:scale-90`}
            />
          ))}
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Flame size={12} className="text-[var(--siren-red)]" />
            <input
              type="range"
              min="0" max="1" step="0.1"
              value={virality}
              onChange={(e) => setVirality(parseFloat(e.target.value))}
              className="flex-1 h-1 bg-[var(--neo-white)]/10 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[var(--siren-red)]"
            />
            <span className="text-[10px] font-mono w-8 text-right text-[var(--siren-red)]">VIR:{virality}</span>
          </div>
          <div className="flex items-center gap-3">
            <Shield size={12} className="text-[#60a5fa]" /> {/* blue-400 */}
            <input
              type="range"
              min="0" max="1" step="0.1"
              value={resistance}
              onChange={(e) => setResistance(parseFloat(e.target.value))}
              className="flex-1 h-1 bg-[var(--neo-white)]/10 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#60a5fa]"
            />
            <span className="text-[10px] font-mono w-8 text-right text-[#60a5fa]">RES:{resistance}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
