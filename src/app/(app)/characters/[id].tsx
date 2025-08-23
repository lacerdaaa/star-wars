import { Character } from '@/src/models/character';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { FavoritesService } from '../../../services/favoritesService';
import { SwapiService } from '../../../services/swapiService';

export type Params = {
  id: string;
};

export default function CharacterDetailScreen() {
  const { id } = useLocalSearchParams<Params>();
  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (id) {
      loadCharacter();
      checkFavorite();
    }
  }, [id]);

  const loadCharacter = async () => {
    if (typeof id === 'string') {
      setLoading(true);
      const data = await SwapiService.getCharacterById(id);
      console.log(data)
      setCharacter(data);
      setLoading(false);
    }
  };

  const checkFavorite = async () => {
    if (typeof id === 'string') {
      const fav = await FavoritesService.isFavorite(parseInt(id), 'characters');
      setIsFavorite(fav);
    }
  };

  const toggleFavorite = async () => {
    if (!character) return;

    if (isFavorite) {
      await FavoritesService.removeFromFavorites(character.id, 'characters');
      setIsFavorite(false);
    } else {
      await FavoritesService.addToFavorites(character, 'characters');
      setIsFavorite(true);
    }
  };

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-black">
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#FACC15" />
          <Text className="text-gray-400 mt-4 font-orbitron-medium">
            Carregando personagem...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!character) {
    return (
      <SafeAreaView className="flex-1 bg-black">
        <View className="flex-1 justify-center items-center px-6">
          <Text className="text-gray-400 text-center font-orbitron-medium">
            Personagem não encontrado
          </Text>
          <TouchableOpacity
            className="mt-4 bg-yellow-400 px-6 py-3 rounded-lg"
            onPress={() => router.back()}
          >
            <Text className="text-black font-orbitron-medium">Voltar</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const InfoRow = ({ label, value }: { label: string; value: string }) => (
    <View className="flex-row justify-between items-center py-3 border-b border-zinc-800">
      <Text className="text-gray-400 font-orbitron-medium">{label}</Text>
      <Text className="text-white font-orbitron-regular flex-1 text-right ml-4">
        {value}
      </Text>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-black">
      <View className="flex-1">
        <View className="flex-row items-center justify-between px-6 py-4 border-b border-zinc-800">
          <TouchableOpacity onPress={() => router.back()}>
            <Text className="text-yellow-400 text-xl">‹</Text>
          </TouchableOpacity>

          <Text className="text-yellow-400 text-xl font-orbitron-bold flex-1 text-center">
            {character.name}
          </Text>

          <TouchableOpacity onPress={toggleFavorite}>
            <Text className={`text-2xl ${isFavorite ? 'text-yellow-400' : 'text-gray-500'}`}>
              ⭐
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView className="flex-1 px-6 py-4">
          <View className="bg-zinc-900 border border-yellow-400/30 rounded-lg p-6 mb-4">
            <Text className="text-white text-2xl font-orbitron-bold text-center mb-6">
              {character.name}
            </Text>

            <InfoRow label="Altura" value={`${character.height} cm`} />
            <InfoRow label="Peso" value={`${character.mass} kg`} />
            <InfoRow label="Cor do cabelo" value={character.hair_color} />
            <InfoRow label="Cor dos olhos" value={character.eye_color} />
            <InfoRow label="Cor da pele" value={character.skin_color} />
            <InfoRow label="Ano de nascimento" value={character.birth_year} />
            <InfoRow label="Gênero" value={character.gender} />
          </View>

          {/* {character.films.length > 0 && (
            <View className="bg-zinc-900 border border-yellow-400/30 rounded-lg p-6 mb-4">
              <Text className="text-yellow-400 text-lg font-orbitron-bold mb-3">
                Filmes ({character.films.length})
              </Text>
              <Text className="text-gray-400 font-orbitron-regular">
                Aparece em {character.films.length} filme(s)
              </Text>
            </View>
          )}

          {character.starships.length > 0 && (
            <View className="bg-zinc-900 border border-yellow-400/30 rounded-lg p-6 mb-4">
              <Text className="text-yellow-400 text-lg font-orbitron-bold mb-3">
                Naves ({character.starships.length})
              </Text>
              <Text className="text-gray-400 font-orbitron-regular">
                Pilota {character.starships.length} nave(s)
              </Text>
            </View>
          )}

          {character.vehicles.length > 0 && (
            <View className="bg-zinc-900 border border-yellow-400/30 rounded-lg p-6">
              <Text className="text-yellow-400 text-lg font-orbitron-bold mb-3">
                Veículos ({character.vehicles.length})
              </Text>
              <Text className="text-gray-400 font-orbitron-regular">
                Pilota {character.vehicles.length} veículo(s)
              </Text>
            </View>
          )} */}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
