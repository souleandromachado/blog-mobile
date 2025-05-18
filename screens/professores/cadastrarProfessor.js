import React, { useLayoutEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';

export default function CadastrarProfessor({ navigation }) {
  const [nome, setNome] = useState('');
  const [disciplina, setDisciplina] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Home',
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
      <Text style={styles.titulo}>Formulário de novo professor:</Text>
      <Text style={styles.label}>Nome do professor:</Text>
      <TextInput
        style={styles.input}
        value={nome}
        onChangeText={setNome}
        placeholder="Digite o nome"
      />

      <Text style={styles.label}>Disciplina:</Text>
      <TextInput
        style={styles.input}
        value={disciplina}
        onChangeText={setDisciplina}
        placeholder="Digite a disciplina"
      />

      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Digite o email"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text style={styles.label}>Senha:</Text>
      <TextInput
        style={styles.input}
        value={senha}
        onChangeText={setSenha}
        placeholder="Digite a senha"
        secureTextEntry
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
