import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
  ActivityIndicator,
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';

// Your Mac's IP. No "/" at the end.
const BASE_URL = 'http://192.168.1.10:3000';

export default function App() {
  const [name, setName] = useState('');       // what the user typed
  const [message, setMessage] = useState(''); // greeting from the server
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Runs when the button is pressed (not on startup anymore).
  const loadGreeting = async () => {
    const trimmedName = name.trim();

    // Validate on the client before bothering the server.
    if (!trimmedName) {
      setMessage('');
      setError('Please enter a name.');
      return;
    }

    setLoading(true);
    setError('');
    setMessage('');

    try {
      const response = await fetch(
        `${BASE_URL}/hello/${encodeURIComponent(trimmedName)}`,
      );

      if (!response.ok) {
        throw new Error(`Server responded with status ${response.status}`);
      }

      const text = await response.text();
      setMessage(text);
    } catch (e) {
      const reason = e instanceof Error ? e.message : 'Unknown error';
      setError(`Could not load the greeting. ${reason}`);
    } finally {
      setLoading(false);
    }
  };

  // Result area: spinner, error, or greeting.
  let result = null;
  if (loading) {
    result = <ActivityIndicator size="large" />;
  } else if (error) {
    result = <Text style={styles.error}>{error}</Text>;
  } else if (message) {
    result = <Text style={styles.message}>{message}</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter your name</Text>

      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="e.g. Rudraksh"
        autoCapitalize="words"
        autoCorrect={false}
      />

      <TouchableOpacity
        onPress={loadGreeting}
        disabled={loading}
        onPressIn={() => setError('')}
        style={{
          backgroundColor: loading ? '#999' : '#007AFF',
          paddingVertical: 12,
          paddingHorizontal: 24,
          borderRadius: 8,
        }}
      >
        <Text>Greet me</Text>
      </TouchableOpacity>


      <View style={styles.resultArea}>{result}</View>

      <StatusBar style="auto" />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightblue',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  input: {
    width: '100%',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 12,
  },
  resultArea: {
    marginTop: 24,
    minHeight: 40,
    alignItems: 'center',
  },
  message: {
    fontSize: 24,
  },
  error: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
  },
});