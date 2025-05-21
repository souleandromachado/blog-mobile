import React, { useState, useLayoutEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

export default function CadastrarAluno({ navigation }) {
  const [nome, setNome] = useState('');
  const [curso, setCurso] = useState('');
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Cadastro de alunos',
      headerStyle: { backgroundColor: '#F5E1C5' },
      headerTitleStyle: { color: '#00838F', fontWeight: 'bold' },
    });
  }, [navigation]);

  const cadastrar = async () => {
    if (!nome.trim() || !curso.trim() || !login.trim() || !senha.trim()) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    try {
      await axios.post(
        'https://blog-api-ld0z.onrender.comalunos',
        {
          nome: nome.trim(),
          curso: curso.trim(),
          login: login.trim(),
          senha: senha.trim(),
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      Alert.alert('Sucesso', 'Aluno cadastrado com sucesso!');
      setNome('');
      setCurso('');
      setLogin('');
      setSenha('');
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
    } catch (error) {
      console.error('Erro ao cadastrar aluno:', error?.response?.data || error.message);
      Alert.alert('Erro', 'Não foi possível cadastrar o aluno.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Cadastro de Aluno</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome do aluno"
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        style={styles.input}
        placeholder="Curso"
        value={curso}
        onChangeText={setCurso}
      />

      <TextInput
        style={styles.input}
        placeholder="Login"
        value={login}
        onChangeText={setLogin}
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />

      <TouchableOpacity style={styles.botaoSalvar} onPress={cadastrar}>
        <Text style={styles.textoBotao}>Cadastrar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botaoCancelar}
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }],
          })
        }
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
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#00838F',
    marginBottom: 30,
  },
  input: {
    backgroundColor: '#D9D9D9',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 15,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  botaoSalvar: {
    marginTop: 30,
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
