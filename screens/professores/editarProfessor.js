import React, { useLayoutEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import axios from 'axios';

export default function EditarProfessor({ route, navigation }) {
  const {
    id,
    nome: nomeInicial,
    disciplina: disciplinaInicial,
    login: loginInicial = '',
    senha: senhaInicial = '',
  } = route.params;

  const [nome, setNome] = useState(nomeInicial);
  const [disciplina, setDisciplina] = useState(disciplinaInicial);
  const [login, setLogin] = useState(loginInicial);
  const [senha, setSenha] = useState(senhaInicial);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Editar Professor',
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

  const salvarAlteracoes = async () => {
    if (!nome.trim() || !disciplina.trim() || !login.trim() || !senha.trim()) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    try {
      await axios.put(`https://blog-api-ld0z.onrender.comprofessores/${id}`, {
        nome,
        materia: disciplina,
        login,
        senha,
      });

      Alert.alert('Sucesso', 'Dados atualizados com sucesso!');
      navigation.reset({
        index: 0,
        routes: [{ name: 'ProfessoresScreen' }],
      });
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível atualizar o professor.');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome:</Text>
      <TextInput
        style={styles.input}
        value={nome}
        onChangeText={setNome}
        placeholder="Digite o nome do professor"
      />

      <Text style={styles.label}>Disciplina:</Text>
      <TextInput
        style={styles.input}
        value={disciplina}
        onChangeText={setDisciplina}
        placeholder="Digite a disciplina"
      />

      <Text style={styles.label}>Login:</Text>
      <TextInput
        style={styles.input}
        value={login}
        onChangeText={setLogin}
        placeholder="Digite o login"
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

      <TouchableOpacity style={styles.botaoSalvar} onPress={salvarAlteracoes}>
        <Text style={styles.textoBotao}>Salvar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botaoCancelar}
        onPress={() => navigation.replace('ProfessoresScreen')}
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
    marginTop: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#F5F5F5',
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
