import { Stack } from 'expo-router';

export default function AppLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="dashboard" />
      <Stack.Screen name="characters" />
      <Stack.Screen name="characters/[id]" />
    </Stack>

  );
}