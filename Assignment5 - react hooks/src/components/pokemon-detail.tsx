import type { Pokemon } from "../types/pokemon";
import { ArrowLeft } from "lucide-react";
import logo from "../../public/logo.svg";

interface PokemonDetailProps {
  pokemon: Pokemon;
  onBack: () => void;
}

export default function PokemonDetail({ pokemon, onBack }: PokemonDetailProps) {
  const healthPercentage = (pokemon.stats.hp / 1000) * 100;

  return (
    <div className="container mx-auto px-4 py-6 bg-[#1e213a] min-h-screen">
      <header className="flex justify-between items-center mb-6">
        <div className="w-40">
          <img src={logo} alt="logo" className="w-[200px] xl:w-[300px]" />
        </div>
      </header>

      <button
        className="mb-8 bg-[#2a2d43] text-white py-3 px-6 rounded-lg flex items-center"
        onClick={onBack}
      >
        <ArrowLeft className="mr-2" />
        Back to list
      </button>

      <div className="mb-8">
        <h2 className="text-white text-3xl font-bold">
          #{pokemon.id.toString().padStart(4, "0")}
        </h2>
      </div>

      <div className="flex justify-center mb-6">
        <img
          src={pokemon.image || "/placeholder.svg"}
          alt={pokemon.name}
          className="w-64 h-64 object-contain"
        />
      </div>

      <div className="flex items-center mb-6">
        <h1 className="text-white text-6xl font-bold">{pokemon.name}</h1>
        <div className="ml-4">
          <img
            src={pokemon.sprite || "/placeholder.svg"}
            alt={`${pokemon.name} sprite`}
            className="w-12 h-12"
          />
        </div>
      </div>

      <div className="bg-[#1a1d2e] rounded-lg p-6 mb-6">
        <div className="mb-6">
          <h3 className="text-gray-400 text-xl mb-2">Health</h3>
          <div className="relative h-4 bg-gray-700 rounded-full overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-green-500 rounded-full"
              style={{ width: `${healthPercentage}%` }}
            ></div>
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-white text-4xl font-bold">
              {pokemon.stats.hp}
            </span>
            <span className="text-gray-400 text-xl">from 1000</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <h3 className="text-gray-400 text-xl mb-2">Attack</h3>
            <span className="text-white text-4xl font-bold">
              {pokemon.stats.attack}
            </span>
          </div>
          <div>
            <h3 className="text-gray-400 text-xl mb-2">Defense</h3>
            <span className="text-white text-4xl font-bold">
              {pokemon.stats.defense}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
