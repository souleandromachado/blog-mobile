import React, { useState, useLayoutEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { useAuth } from '../authContext';

export default function LoginScreen({ navigation, route }) {
  const { login } = useAuth();
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');

  const API_URL = 'https://blog-api-ld0z.onrender.com';

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Home',
      headerStyle: {
        backgroundColor: '#F5E1C5',
      },
      headerTitleStyle: {
        color: '#00838F',
        fontWeight: 'bold',
      },
    });
  }, [navigation]);


  const handleLogin = async () => {
    if (!usuario.trim() || !senha.trim()) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/professores/auth`, {
        login: usuario,
        senha: senha,
      });

      if (response.status === 201 || response.status === 200) {
        Alert.alert('Sucesso', 'Login Realizado com sucesso!');
        login();
        navigation.replace('Home');
      } 
    }
      catch (error) {
        console.error(error);
        Alert.alert('Erro', 'Não foi possível realizar o login.');
        logout();
      }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Login do Docente</Text>

      <View style={styles.cardLogin}>
        <TextInput
          style={styles.input}
          placeholder="Usuário"
          placeholderTextColor="#ccc"
          value={usuario}
          onChangeText={setUsuario}
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor="#ccc"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />

        <TouchableOpacity style={styles.botao} onPress={handleLogin}>
          <Text style={styles.textoBotao}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botaoCancelar} 
          onPress = {() => navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }],
          })}>
          <Text style={styles.textoBotao}>Cancelar</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5E1C5',

    alignItems: 'center',
    padding: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#00838F',
  },
  cardLogin: {
    backgroundColor: '#00838F',
    padding: 20,
    borderRadius: 20,
    width: '100%',
  },
  input: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
  },
  botao: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
    botaoCancelar: {
    marginTop: 10,
    backgroundColor: '#DB1919',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
