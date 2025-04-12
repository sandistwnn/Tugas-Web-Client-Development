import type { Pokemon } from "../types/pokemon";

// Mock data for the Pokemon
const mockPokemon: Pokemon[] = [
  {
    id: 1001,
    name: "Bulbasaur",
    type: "Grass",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
    sprite:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
    stats: {
      hp: 144,
      attack: 32,
      defense: 50,
    },
  },
  {
    id: 1002,
    name: "Ivysaur",
    type: "Grass",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/2.png",
    sprite:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png",
    stats: {
      hp: 155,
      attack: 40,
      defense: 55,
    },
  },
  {
    id: 1003,
    name: "Venusaur",
    type: "Grass",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/3.png",
    sprite:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png",
    stats: {
      hp: 180,
      attack: 52,
      defense: 63,
    },
  },
  {
    id: 1004,
    name: "Charmander",
    type: "Fire",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png",
    sprite:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png",
    stats: {
      hp: 130,
      attack: 38,
      defense: 30,
    },
  },
  {
    id: 1005,
    name: "Kabuto",
    type: "Rock",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/140.png",
    sprite:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/140.png",
    stats: {
      hp: 120,
      attack: 45,
      defense: 70,
    },
  },
  {
    id: 1006,
    name: "Squirtle",
    type: "Water",
    image:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png",
    sprite:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png",
    stats: {
      hp: 140,
      attack: 30,
      defense: 45,
    },
  },
];

// Function to simulate fetching Pokemon data
export async function fetchPokemon(): Promise<Pokemon[]> {
  // Simulate API delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockPokemon);
    }, 800);
  });
}

// Function to get a single Pokemon by ID
export async function getPokemonById(id: number): Promise<Pokemon | undefined> {
  // Simulate API delay
  return new Promise((resolve) => {
    setTimeout(() => {
      const pokemon = mockPokemon.find((p) => p.id === id);
      resolve(pokemon);
    }, 300);
  });
}
