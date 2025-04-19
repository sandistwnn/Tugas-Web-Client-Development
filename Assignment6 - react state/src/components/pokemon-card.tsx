import type { Pokemon } from "../types/pokemon";

interface PokemonCardProps {
  pokemon: Pokemon;
  viewMode: "grid" | "list";
  onClick: () => void;
}

export default function PokemonCard({
  pokemon,
  viewMode,
  onClick,
}: PokemonCardProps) {
  if (viewMode === "list") {
    return (
      <div
        className="bg-white rounded-lg overflow-hidden shadow-md cursor-pointer"
        onClick={onClick}
      >
        <div className="p-4">
          <div className="flex justify-between items-start">
            <span className="text-green-500 font-medium">{pokemon.type}</span>
            <span className="text-gray-700 font-bold">
              #{pokemon.id.toString().padStart(4, "0")}
            </span>
          </div>
          <div className="flex justify-between items-center mt-2">
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                {pokemon.name}
              </h2>
            </div>
            <div className="w-32 h-32">
              <img
                src={pokemon.image || "/placeholder.svg"}
                alt={pokemon.name}
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="bg-white rounded-lg overflow-hidden shadow-md cursor-pointer flex flex-col items-center p-4"
      onClick={onClick}
    >
      <div className="w-24 h-24 mb-2">
        <img
          src={pokemon.image || "/placeholder.svg"}
          alt={pokemon.name}
          className="w-full h-full object-contain"
        />
      </div>
      <div className="text-center">
        <h3 className="text-lg font-bold text-gray-800">{pokemon.name}</h3>
        <p className="text-gray-600">in two lines</p>
      </div>
    </div>
  );
}
