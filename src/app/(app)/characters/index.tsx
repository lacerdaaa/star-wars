import { Character } from '@/src/models/character';
import { FavoritesService } from '@/src/services/favoritesService';
import { SwapiService } from '@/src/services/swapiService';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

export default function CharactersScreen() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [favorites, setFavorites] = useState<number[]>([]);

  useEffect(() => {
    loadCharacters();
    loadFavorites();
  }, []);

  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      if (search.trim()) {
        searchCharacters();
      } else {
        loadCharacters();
      }
    }, 500);

    return () => clearTimeout(delayedSearch);
  }, [search]);

  const loadCharacters = async () => {
    setLoading(true);
    const data = await SwapiService.searchCharacters();
    setCharacters(data);
    setLoading(false);
  };

  const searchCharacters = async () => {
    setLoading(true);
    const data = await SwapiService.searchCharacters(search);
    setCharacters(data);
    setLoading(false);
  };

  const loadFavorites = async () => {
    const favs = await FavoritesService.getFavorites();
    setFavorites(favs.characters.map(char => char.id));
  };

  const toggleFavorite = async (character: Character) => {
    const isFav = favorites.includes(character.id);

    if (isFav) {
      await FavoritesService.removeFromFavorites(character.id, 'characters');
      setFavorites(prev => prev.filter(id => id !== character.id));
    } else {
      await FavoritesService.addToFavorites(character, 'characters');
      setFavorites(prev => [...prev, character.id]);
    }
  };

  const renderCharacter = ({ item }: { item: Character }) => (
    <TouchableOpacity
      className="bg-zinc-900 border border-yellow-400/30 p-4 rounded-lg mb-3 flex-row justify-between items-center"
      onPress={() => router.push(`/(app)/characters`)} // TODO: implementar rota para visualiuzar personagens uniso
    >
      <View className="flex-1">
        <Text className="text-white text-lg font-orbitron-medium mb-1">
          {item.name}
        </Text>
        <Text className="text-gray-400 text-sm">Altura: {item.height}</Text>
      </View>

      <TouchableOpacity
        onPress={() => toggleFavorite(item)}
        className="ml-4"
      >
        <Text className="text-yellow-400">
          {favorites.includes(item.id) ? '★' : '☆'}
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-black px-4 pt-4">
      {/* Campo de busca */}
      <TextInput
        placeholder="Buscar personagem..."
        placeholderTextColor="#aaa"
        value={search}
        onChangeText={setSearch}
        className="bg-zinc-800 text-white px-4 py-3 rounded-lg border border-yellow-400/30 mb-4"
      />

      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#FACC15" />
          <Text className="text-gray-400 mt-4 font-orbitron-medium">
            Carregando personagens...
          </Text>
        </View>
      ) : (
        <FlatList
          data={characters}
          renderItem={renderCharacter}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View className="flex-1 justify-center items-center py-20">
              <Text className="text-gray-400 text-center font-orbitron-medium">
                Nenhum personagem encontrado
              </Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
}
