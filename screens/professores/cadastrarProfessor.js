import React, { useLayoutEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';

export default function CadastrarProfessor({ navigation }) {
  const [nome, setNome] = useState('');
  const [materia, setMateria] = useState('');
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false); // estado de loading

  const API_URL = 'https://blog-api-ld0z.onrender.com';

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Cadastro de professores',
      headerStyle: {
        backgroundColor: '#F5E1C5',
      },
      headerTitleStyle: {
        color: '#00838F',
        fontWeight: 'bold',
        fontSize: 20,
      },
    });
  }, [navigation]);

  const limparCampos = () => {
    setNome('');
    setMateria('');
    setLogin('');
    setSenha('');
  };

  const cadastrar = async () => {
    if (!nome.trim() || !materia.trim() || !login.trim() || !senha.trim()) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/professores`, {
        nome,
        materia,
        login,
        senha,
      });

      if (response.status === 201 || response.status === 200) {
        Alert.alert('Sucesso', 'Professor cadastrado com sucesso!');
        limparCampos();
        navigation.reset({
          index: 0,
          routes: [{ name: 'Home' }],
        });
      } else {
        Alert.alert('Erro', 'Não foi possível cadastrar o professor.');
      }
    } catch (error) {
      console.error('Erro ao cadastrar professor:', error);
      Alert.alert('Erro', 'Falha ao conectar com o servidor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Formulário de novo professor:</Text>

      <Text style={styles.label}>Nome do professor:</Text>
      <TextInput
        style={styles.input}
        value={nome}
        onChangeText={setNome}
        placeholder="Digite o nome"
        editable={!loading}
      />

      <Text style={styles.label}>Matéria:</Text>
      <TextInput
        style={styles.input}
        value={materia}
        onChangeText={setMateria}
        placeholder="Digite a matéria"
        editable={!loading}
      />

      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={styles.input}
        value={login}
        onChangeText={setLogin}
        placeholder="Digite o email"
        keyboardType="email-address"
        autoCapitalize="none"
        editable={!loading}
      />

      <Text style={styles.label}>Senha:</Text>
      <TextInput
        style={styles.input}
        value={senha}
        onChangeText={setSenha}
        placeholder="Digite a senha"
        secureTextEntry
        editable={!loading}
      />

      <TouchableOpacity
        style={[styles.botaoSalvar, loading && { backgroundColor: '#6CA6A9' }]}
        onPress={cadastrar}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#FFF" />
        ) : (
          <Text style={styles.textoBotao}>Cadastrar</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botaoCancelar}
        onPress={() => {
          navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }],
          });
        }}
        disabled={loading}
      >
        <Text style={styles.textoBotao}>Cancelar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  label: {
    fontSize: 16,
    color: '#00838F',
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 5,
  },
  titulo: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#00838F',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#D9D9D9',
    borderRadius: 8,
    padding: 10,
  },
  botaoSalvar: {
    marginTop: 20,
    backgroundColor: '#00838F',
    paddingVertical: 12,
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
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
