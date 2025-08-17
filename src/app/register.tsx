import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { AuthService } from '../services/authService';

export default function RegisterScreen() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    if (!username.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return false;
    }

    if (password !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem');
      return false;
    }

    if (password.length < 6) {
      Alert.alert('Erro', 'A senha deve ter pelo menos 6 caracteres');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Erro', 'Email inválido');
      return false;
    }

    return true;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    const result = await AuthService.register(username.trim(), email.trim(), password);
    setIsLoading(false);

    if (result.success) {
      Alert.alert('Sucesso', result.message, [
        { text: 'OK', onPress: () => router.back() }
      ]);
    } else {
      Alert.alert('Erro', result.message);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-black">
      <View className="flex-1 px-6 py-8 justify-center">
        <Text className="text-yellow-400 text-3xl font-orbitron-bold text-center mb-2">
          CRIAR CONTA
        </Text>
        <Text className="text-gray-400 text-center mb-8 font-orbitron-medium">
          Junte-se à Rebelião
        </Text>

        <TextInput
          value={username}
          onChangeText={setUsername}
          placeholder="Nome de usuário"
          placeholderTextColor="#A1A1AA"
          className="w-full bg-zinc-900 text-white px-4 py-3 rounded-lg border border-yellow-400 mb-4"
          autoCapitalize="none"
          editable={!isLoading}
        />

        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          placeholderTextColor="#A1A1AA"
          className="w-full bg-zinc-900 text-white px-4 py-3 rounded-lg border border-yellow-400 mb-4"
          keyboardType="email-address"
          autoCapitalize="none"
          editable={!isLoading}
        />

        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Senha"
          placeholderTextColor="#A1A1AA"
          secureTextEntry
          className="w-full bg-zinc-900 text-white px-4 py-3 rounded-lg border border-yellow-400 mb-4"
          editable={!isLoading}
        />

        <TextInput
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="Confirmar senha"
          placeholderTextColor="#A1A1AA"
          secureTextEntry
          className="w-full bg-zinc-900 text-white px-4 py-3 rounded-lg border border-yellow-400 mb-6"
          editable={!isLoading}
        />

        <TouchableOpacity
          className={`w-full py-3 rounded-lg mb-4 ${isLoading ? 'bg-yellow-600' : 'bg-yellow-400 active:bg-yellow-300'}`}
          onPress={handleRegister}
          disabled={isLoading}
        >
          <Text className="text-black font-bold text-center text-lg">
            {isLoading ? 'Criando...' : 'Criar Conta'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.back()}
          disabled={isLoading}
        >
          <Text className="text-yellow-400 font-orbitron-medium text-center">
            Já tem conta? Faça login
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}