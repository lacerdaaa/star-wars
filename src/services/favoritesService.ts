import AsyncStorage from '@react-native-async-storage/async-storage';
import { Character } from '../models/character';
import { Film } from '../models/film';

export interface Favorites {
  characters: Character[];
  films: Film[]
};

export class FavoritesService {
  private static readonly FAVORITES_KEY = 'favorites';

  static async getFavorites(): Promise<Favorites> {
    try {
      const favoritesJson = await AsyncStorage.getItem(this.FAVORITES_KEY);
      return favoritesJson ? JSON.parse(favoritesJson) : {
        characters: [],
        films: [],
      };
    } catch (error) {
      return { characters: [], films: [] };
    }
  }

  static async addToFavorites(item: Character  Film, type: 'characters' | 'films'): Promise<void> {
    try {
      const favorites = await this.getFavorites();

      const exists = favorites[type].some((fav: any) => fav.id === item.id);
      if (!exists) {
        favorites[type].push(item);
        await AsyncStorage.setItem(this.FAVORITES_KEY, JSON.stringify(favorites));
      }
    } catch (error) {
      console.error('Erro ao adicionar aos favoritos:', error);
    }
  }

  static async removeFromFavorites(itemId: number, type: 'characters'): Promise<void> {
    try {
      const favorites = await this.getFavorites();
      favorites[type] = favorites[type].filter((item: any) => item.id !== itemId);
      await AsyncStorage.setItem(this.FAVORITES_KEY, JSON.stringify(favorites));
    } catch (error) {
      console.error('Erro ao remover dos favoritos:', error);
    }
  }

  static async isFavorite(itemId: number, type: 'characters'): Promise<boolean> {
    try {
      const favorites = await this.getFavorites();
      return favorites[type].some((item: any) => item.id === itemId);
    } catch (error) {
      return false;
    }
  }
}