import { Character } from "./character";

export interface Film {
  id: string,
  title: string,
  episodeId: number,
  openingCrawl: string,
  director: string,
  producer: string,
  releaseDate: string,
  characters: Character[],
  planets: string[],
  starships: string[],
  vehicles: string[],
  species: string[],
};