import { Stack } from 'expo-router';
import "../global.css";

export default function Layout() {
  return (
    <Stack screenOptions={{ headerStyle: { backgroundColor: '#000' }, headerTintColor: '#FFD700', headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="details/[id]" options={{ title: 'Escolher' }}/>
    </Stack>
  );
}
