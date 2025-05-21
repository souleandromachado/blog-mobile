import React, { useState, useLayoutEffect } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';

export default function EditPostScreen({ route, navigation }) {
  const { id, titulo: tituloInicial, autor: autorInicial, conteudo: conteudoInicial } = route.params;

  const [titulo, setTitulo] = useState(tituloInicial);
  const [autor, setAutor] = useState(autorInicial);
  const [conteudo, setConteudo] = useState(conteudoInicial);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Editar postagem',
      headerStyle: {
        backgroundColor: '#F5E1C5',
      },
      headerTitleStyle: {
        color: '#00838F',
        fontWeight: 'bold',
      },
    });
  }, [navigation]);

  const salvarEdicao = async () => {
    if (!titulo || !autor || !conteudo) {
      Alert.alert('Atenção', 'Preencha todos os campos!');
      return;
    }

    try {
      await axios.put(`https://blog-api-ld0z.onrender.composts/${id}`, {
        titulo,
        autor,
        conteudo,
      });

      Alert.alert('Sucesso', 'Postagem atualizada com sucesso!');
      navigation.replace('AdminScreen');
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível atualizar a postagem.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Editar postagem</Text>

      <Text style={styles.label}>Título:</Text>
      <TextInput
        style={styles.input}
        value={titulo}
        onChangeText={setTitulo}
        placeholder="Digite o título"
      />

      <Text style={styles.label}>Autor:</Text>
      <TextInput
        style={styles.input}
        value={autor}
        onChangeText={setAutor}
        placeholder="Nome do professor"
      />

      <Text style={styles.label}>Conteúdo:</Text>
      <TextInput
        style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
        value={conteudo}
        onChangeText={setConteudo}
        placeholder="Escreva a postagem"
        multiline
      />

      <TouchableOpacity style={styles.botaoSalvar} onPress={salvarEdicao}>
        <Text style={styles.textoBotao}>Salvar Alterações</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botaoCancelar}
        onPress={() => navigation.replace('AdminScreen')}
      >
        <Text style={styles.textoCancelar}>Cancelar</Text>
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#00838F',
  },
  label: {
    fontWeight: 'bold',
    marginTop: 20,
    color: '#00838F',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#D9D9D9',
    borderRadius: 8,
    padding: 10,
  },
  botaoSalvar: {
    marginTop: 30,
    backgroundColor: '#4CAF50',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  botaoCancelar: {
    marginTop: 15,
    backgroundColor: '#DB1919',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  textoCancelar: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
