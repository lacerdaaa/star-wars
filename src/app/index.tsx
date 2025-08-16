import { useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  const [userValue, setUserValue] = useState('');
  const [userPasswordValue, setUserPasswordValue] = useState('');

  return (
    <View className="flex-1 bg-black items-center justify-center px-6">
      <Text className='text-gray-400 font-orbitron-medium mb-1 text-sm'>Eduardo Lacerda</Text>
      <Text className="text-yellow-400 text-4xl font-extrabold tracking-widest mb-8 font-orbitron-bold">
        STAR WARS
      </Text>

      <TextInput
        value={userValue}
        onChangeText={setUserValue}
        placeholder="Usuário Jedi"
        placeholderTextColor="#A1A1AA"
        className="w-full bg-zinc-900 text-white px-4 py-3 rounded-lg border border-yellow-400 mb-4"
      />

      <TextInput
        value={userPasswordValue}
        onChangeText={setUserPasswordValue}
        placeholder="Senha"
        placeholderTextColor="#A1A1AA"
        secureTextEntry
        className="w-full bg-zinc-900 text-white px-4 py-3 rounded-lg border border-yellow-400 mb-6"
      />

      <TouchableOpacity className="w-full bg-yellow-400 py-3 rounded-lg active:bg-yellow-300">
        <Text className="text-black font-bold text-center text-lg">
          Entrar na Galáxia
        </Text>
      </TouchableOpacity>

      <Text className="text-gray-400 mt-8 text-center font-orbitron-medium text-lg">
        Que a Força esteja com você
      </Text>

      <Image
        source={require('../assets/images/moon.png')}
        className="absolute bottom-[-170] self-center"
        style={{ width: 400, height: 400 }}
        resizeMode="cover"
      />
    </View>
  );
}
