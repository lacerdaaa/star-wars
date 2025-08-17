import { Character } from "../models/character";

const BASE_URL = 'https://swapi.online/api';

export class SwapiService {
  static async searchCharacters(search?: string): Promise<Character[]> {
    try {
      const url = search
        ? `${BASE_URL}/people?search=${encodeURIComponent(search)}`
        : `${BASE_URL}/characters`;

      const response = await fetch(url);
      const data = await response.json();

      return data.results || data;
    } catch (error) {
      console.error('Erro ao buscar personagens:', error);
      return [];
    }
  }

  static async getCharacterById(id: string): Promise<Character | null> {
    try {
      const response = await fetch(`${BASE_URL}/people/${id}`);
      return await response.json();
    } catch (error) {
      console.error('Erro ao buscar personagem:', error);
      return null;
    }
  }
}