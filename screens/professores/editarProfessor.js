import React, { useLayoutEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';

export default function EditarProfessor({ route, navigation }) {
  const { id, nome: nomeInicial, disciplina: disciplinaInicial } = route.params;

  const [nome, setNome] = useState(nomeInicial);
  const [disciplina, setDisciplina] = useState(disciplinaInicial);


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

  const salvarAlteracoes = () => {
    if (!nome.trim() || !disciplina.trim()) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    // Aqui você faria o PUT ou PATCH para a API
    Alert.alert('Sucesso', 'Dados atualizados com sucesso!');
    navigation.goBack();
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

      <TouchableOpacity style={styles.botaoSalvar} onPress={salvarAlteracoes}>
        <Text style={styles.textoBotao}>Salvar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botaoCancelar} onPress={() => navigation.navigate('ProfessoresScreen')}>
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
