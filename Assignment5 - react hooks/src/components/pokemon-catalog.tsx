import type React from "react";

import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import PokemonCard from "./pokemon-card";
import PokemonDetail from "./pokemon-detail";
import type { Pokemon } from "../types/pokemon";
import { fetchPokemon } from "../lib/api";
import logo from "../../public/logo.svg";

export default function PokemonCatalog() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [filteredPokemons, setFilteredPokemons] = useState<Pokemon[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [sortOption, setSortOption] = useState<string>("id");
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isSearching, setIsSearching] = useState<boolean>(false);

  useEffect(() => {
    const loadPokemon = async () => {
      setLoading(true);
      try {
        const data = await fetchPokemon();
        setPokemons(data);
        setFilteredPokemons(data);
      } catch (error) {
        console.error("Failed to fetch pokemon:", error);
      } finally {
        setLoading(false);
      }
    };

    loadPokemon();
  }, []);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
    sortPokemon(e.target.value, filteredPokemons);
  };

  const sortPokemon = (option: string, pokemonList: Pokemon[]) => {
    const sortedPokemon = [...pokemonList];
    switch (option) {
      case "id":
        sortedPokemon.sort((a, b) => a.id - b.id);
        break;
      case "name":
        sortedPokemon.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "type":
        sortedPokemon.sort((a, b) => a.type.localeCompare(b.type));
        break;
      default:
        break;
    }
    setFilteredPokemons(sortedPokemon);
  };

  const handlePokemonSelect = (pokemon: Pokemon) => {
    setSelectedPokemon(pokemon);
  };

  const handleBackToList = () => {
    setSelectedPokemon(null);
  };

  const handleSearchToggle = () => {
    setIsSearching(!isSearching);
    if (!isSearching) {
      setSearchQuery("");
      setFilteredPokemons(pokemons);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (query.trim() === "") {
      setFilteredPokemons(pokemons);
    } else {
      const results = pokemons.filter(
        (pokemon) =>
          pokemon.name.toLowerCase().includes(query) ||
          pokemon.type.toLowerCase().includes(query) ||
          pokemon.id.toString().includes(query)
      );
      setFilteredPokemons(results);
    }
  };

  if (selectedPokemon) {
    return (
      <PokemonDetail pokemon={selectedPokemon} onBack={handleBackToList} />
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <header className="flex justify-between items-center mb-6">
        <div className="w-40">
          <img src={logo} alt="logo" className="w-[200px] xl:w-[300px]" />
        </div>
        <button
          className="text-white p-2 rounded-full bg-[#2a2d43]"
          onClick={handleSearchToggle}
        >
          <Search size={24} />
        </button>
      </header>

      {isSearching && (
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search Pokémen..."
            className="w-full py-3 px-4 bg-[#3b4056] text-white rounded-md focus:outline-none"
            value={searchQuery}
            onChange={handleSearch}
            autoFocus
          />
        </div>
      )}

      <div className="flex justify-between items-center mb-6">
        <div className="relative w-full max-w-md">
          <select
            className="w-full py-3 px-4 pr-10 bg-[#3b4056] text-white rounded-md appearance-none focus:outline-none"
            value={sortOption}
            onChange={handleSortChange}
          >
            <option value="id">Sort by ID</option>
            <option value="name">Sort by Name</option>
            <option value="type">Sort by Type</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>

        <div className="flex ml-4 bg-[#2a2d43] rounded-md overflow-hidden">
          <button
            className={`p-3 ${
              viewMode === "list" ? "bg-[#1a1d2e]" : "bg-[#2a2d43]"
            }`}
            onClick={() => setViewMode("list")}
          >
            <div className="w-6 h-6 flex flex-col justify-between">
              <div className="h-1 w-full bg-gray-400 rounded"></div>
              <div className="h-1 w-full bg-gray-400 rounded"></div>
              <div className="h-1 w-full bg-gray-400 rounded"></div>
            </div>
          </button>
          <button
            className={`p-3 ${
              viewMode === "grid" ? "bg-[#1a1d2e]" : "bg-[#2a2d43]"
            }`}
            onClick={() => setViewMode("grid")}
          >
            <div className="w-6 h-6 grid grid-cols-2 gap-1">
              <div className="bg-gray-400 rounded"></div>
              <div className="bg-gray-400 rounded"></div>
              <div className="bg-gray-400 rounded"></div>
              <div className="bg-gray-400 rounded"></div>
            </div>
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
        </div>
      ) : filteredPokemons.length === 0 ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-white text-xl">
            No Pokémen found matching your search.
          </p>
        </div>
      ) : (
        <div
          className={
            viewMode === "grid" ? "grid grid-cols-2 gap-4" : "space-y-4"
          }
        >
          {filteredPokemons.map((pokemon) => (
            <PokemonCard
              key={pokemon.id}
              pokemon={pokemon}
              viewMode={viewMode}
              onClick={() => handlePokemonSelect(pokemon)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
