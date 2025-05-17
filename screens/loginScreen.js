import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = () => {
    // Aqui entraria a lógica de autenticação
    if (email === 'professor@lumiar.com' && senha === '123456') {
      navigation.navigate('Home');
    } else {
      alert('Credenciais inválidas');
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Email:</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Digite seu e-mail"
        style={{ borderBottomWidth: 1, marginBottom: 15 }}
      />
      <Text>Senha:</Text>
      <TextInput
        value={senha}
        onChangeText={setSenha}
        placeholder="Digite sua senha"
        secureTextEntry
        style={{ borderBottomWidth: 1, marginBottom: 15 }}
      />
      <Button title="Entrar" onPress={handleLogin} />
    </View>
  );
}
