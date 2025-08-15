import { Button, Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#111' }}>
      <Text style={{ fontSize: 24, color: '#FFD700', marginBottom: 20 }}>🌌 Star Wars App</Text>

        <Button title="Ver Luke Skywalker" />

    </View>
  );
}
