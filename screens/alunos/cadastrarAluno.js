import React, { useState, useLayoutEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

export default function CadastrarAluno({ navigation }) {
  const [nome, setNome] = useState('');
  const [turma, setTurma] = useState('');

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Cadastro de alunos',
      headerStyle: {
        backgroundColor: '#F5E1C5',
      },
      headerTitleStyle: {
        color: '#00838F',
        fontWeight: 'bold',
      },
    });
  }, [navigation]);

  const cadastrar = () => {
    if (!nome.trim() || !disciplina.trim() || !email.trim() || !senha.trim()) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    // Aqui você faria o POST para a API
    Alert.alert('Sucesso', 'Professor cadastrado com sucesso!');
    navigation.goBack(); // Volta para ProfessoresScreen
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
        placeholder="Turma"
        value={turma}
        onChangeText={setTurma}
      />

      <TouchableOpacity style={styles.botaoSalvar} onPress={cadastrar}>
        <Text style={styles.textoBotao}>Cadastrar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botaoCancelar}
        onPress={() => navigation.goBack()}>
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