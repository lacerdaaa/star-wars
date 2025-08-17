import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { AuthService } from '../services/authService';

export default function HomeScreen() {
  const [userValue, setUserValue] = useState('');
  const [userPasswordValue, setUserPasswordValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!userValue.trim() || !userPasswordValue.trim()) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    setIsLoading(true);
    const result = await AuthService.login(userValue.trim(), userPasswordValue);
    setIsLoading(false);

    if (result.success) {
      router.replace('/(app)/dashboard');
    } else {
      Alert.alert('Erro', result.message);
    }
  };

  return (
    <View className="flex-1 bg-black items-center justify-center px-6">
      <Text className='text-gray-400 font-orbitron-medium mb-1 text-sm'>Eduardo Lacerda</Text>
      <Text className="text-yellow-400 text-4xl font-extrabold tracking-widest mb-8 font-orbitron-bold">
        STAR WARS
      </Text>

      <TextInput
        value={userValue}
        onChangeText={setUserValue}
        placeholder="Email ou Usuário"
        placeholderTextColor="#A1A1AA"
        className="w-full bg-zinc-900 text-white px-4 py-3 rounded-lg border border-yellow-400 mb-4"
        autoCapitalize="none"
        editable={!isLoading}
      />

      <TextInput
        value={userPasswordValue}
        onChangeText={setUserPasswordValue}
        placeholder="Senha"
        placeholderTextColor="#A1A1AA"
        secureTextEntry
        className="w-full bg-zinc-900 text-white px-4 py-3 rounded-lg border border-yellow-400 mb-6"
        editable={!isLoading}
      />

      <TouchableOpacity
        className={`w-full py-3 rounded-lg mb-4 ${isLoading ? 'bg-yellow-600' : 'bg-yellow-400 active:bg-yellow-300'}`}
        onPress={handleLogin}
        disabled={isLoading}
      >
        <Text className="text-black font-bold text-center text-lg">
          {isLoading ? 'Entrando...' : 'Entrar na Galáxia'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.push('/_sitemap')}
        disabled={isLoading}
      >
        <Text className="text-yellow-400 font-orbitron-medium">
          Não tem conta? Registre-se aqui
        </Text>
      </TouchableOpacity>

      <Text className="text-gray-400 mt-8 text-center font-orbitron-medium text-md">
        Que a Força esteja com você
      </Text>

      <Image
        source={require('../assets/images/death-star.png')}
        className="absolute bottom-[-170] self-center -rotate-30"
        style={{ width: 400, height: 400 }}
        resizeMode="cover"
      />
    </View>
  );
}