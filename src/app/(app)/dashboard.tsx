import { router } from 'expo-router';
import React from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';

export default function Dashboard() {
  const menuItems = [
    {
      title: 'Personagens',
      subtitle: 'Explore a galáxia de personagens',
      route: '/characters',
      icon: '👤'
    },
    { 
      title: 'Filmes',
      subtitle: 'Explore a sequência dos filmes',
      route: '/films',
      icon: '🎥',
    },
    { 
      title: "Naves",
      subtitle: "Explore as naves usadas pelos personagens",
      route: '/vehicles',
      icon: '🚀'
    }
  ];

  return (
    <SafeAreaView className="flex-1 bg-black">
      <View className="flex-1 px-6 py-8">
        <Text className="text-yellow-400 text-3xl font-orbitron-bold text-center mb-2">
          STAR WARS
        </Text>
        <Text className="text-gray-400 text-center mb-8 font-orbitron-medium">
          Explore a galáxia distante
        </Text>

        <View className="flex-1 justify-center gap-4 space-y-4">
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              className="bg-zinc-900 border border-yellow-400/30 p-6 rounded-lg active:bg-zinc-800"
              onPress={() => router.push(item.route as any)}
            >
              <View className="flex-row items-center">
                <Text className="text-2xl mr-4">{item.icon}</Text>
                <View className="flex-1 ">
                  <Text className="text-white text-lg font-orbitron-medium">
                    {item.title}
                  </Text>
                  <Text className="text-gray-400 text-sm font-orbitron-regular">
                    {item.subtitle}
                  </Text>
                </View>
                <Text className="text-yellow-400 text-xl">›</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}