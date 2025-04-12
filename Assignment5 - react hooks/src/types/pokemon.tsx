export interface Pokemon {
  id: number;
  name: string;
  type: string;
  image: string;
  sprite: string;
  stats: {
    hp: number;
    attack: number;
    defense: number;
  };
}
