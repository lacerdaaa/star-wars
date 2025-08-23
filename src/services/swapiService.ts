import { Character } from "../models/character";
import { Film } from "../models/film";

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
  };

  static async searchFilms(search?: string): Promise<Film[]> {
    try {
      const url = search ? `${BASE_URL}/films/search=${encodeURI(search)}` : `${BASE_URL}/films`
      const response = await fetch(url);

      return response.json();
    } catch (error) {
      console.log('Erro ao buscar filme.')
      return [];
    };
  };

  static async getFilmById(id: string) {
    try {
      const url = `${BASE_URL}/films/${id}`;
      const response = await fetch(url);

      return response.json();
    } catch (error) {
      console.log(error)
      throw new Error('Erro ao fazer fetch do filme.')
    }
  };
};