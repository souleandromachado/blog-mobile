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

export default function EditarAluno({ route, navigation }) {
  const { aluno } = route.params;
  console.log('Aluno recebido:', aluno);

  const [nome, setNome] = useState(aluno.nome);
  const [curso, setCurso] = useState(aluno.curso || '');
  const [matricula, setMatricula] = useState(aluno.matricula || '');

  const API_URL = 'https://blog-api-ld0z.onrender.com';

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Editar Aluno',
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
    if (!nome.trim() || !login.trim() || !senha.trim()) {
      Alert.alert('Erro', 'Preencha todos os campos obrigatórios.');
      return;
    }

    try {
      await axios.put(
        `${API_URL}/alunos/${aluno._id}`,
        {
          nome: nome.trim(),
          curso: curso.trim(),
          matricula: matricula.trim(),
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      Alert.alert('Sucesso', 'Dados atualizados com sucesso!');
      if (route.params?.onGoBack) {
        route.params.onGoBack();
      }
      navigation.goBack();
    } catch (error) {
      console.error(error.response?.data || error.message);
      Alert.alert('Erro', 'Não foi possível atualizar os dados.');
    }
  };


  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome:</Text>
      <TextInput
        style={styles.input}
        value={nome}
        onChangeText={setNome}
        placeholder="Digite o nome do aluno"
      />

      <Text style={styles.label}>Curso:</Text>
      <TextInput
        style={styles.input}
        value={curso}
        onChangeText={setCurso}
        placeholder="Digite o curso do aluno"
      />

      <Text style={styles.label}>Matricula:</Text>
      <TextInput
        style={styles.input}
        value={matricula}
        onChangeText={setMatricula}
        placeholder="Digite a Matricula do aluno"
        autoCapitalize="none"
      />

      <TouchableOpacity style={styles.botaoSalvar} onPress={salvarAlteracoes}>
        <Text style={styles.textoBotao}>Salvar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botaoCancelar}
        onPress={() => navigation.goBack()}
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
