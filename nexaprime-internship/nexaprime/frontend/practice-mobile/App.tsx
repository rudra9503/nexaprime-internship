import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
  ActivityIndicator,
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

const BASE_URL = 'http://192.168.1.6:3000'; 

export default function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [errors, setErrors] = useState<string[]>([]);

  const createUser = async () => {
    setLoading(true);
    setSuccess('');
    setErrors([]);

    try {
      const response = await fetch(`${BASE_URL}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Validation errors: message is an array. Other errors: a string.
        const messages = Array.isArray(data.message)
          ? data.message
          : [data.message ?? `Server responded with status ${response.status}`];
        setErrors(messages);
        return;
      }

      setSuccess(`Created user #${data.id}: ${data.name} (${data.email})`);
      setName('');
      setEmail('');
    } catch (e) {
      setErrors(['Could not reach the server. Check your Wi-Fi and BASE_URL.']);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create user</Text>

      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Name"
        autoCorrect={false}
      />
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        autoCorrect={false}
      />

      <Button title="Create" onPress={createUser} disabled={loading} />

      <View style={styles.resultArea}>
        {loading && <ActivityIndicator size="large" />}
        {errors.map((msg, i) => (
          <Text key={i} style={styles.error}>
            {msg}
          </Text>
        ))}
        {success !== '' && <Text style={styles.success}>{success}</Text>}
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightblue',
    justifyContent: 'center',
    padding: 16,
  },
  title: { fontSize: 22, marginBottom: 12, textAlign: 'center' },
  input: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 12,
  },
  resultArea: { marginTop: 24, minHeight: 60, alignItems: 'center' },
  error: { color: 'red', textAlign: 'center', marginBottom: 4 },
  success: { color: 'green', fontSize: 16, textAlign: 'center' },
});