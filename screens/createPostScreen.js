import React, { useState, useLayoutEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import api from '../services/api';

export default function CreatePostScreen({ navigation }) {
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [conteudo, setConteudo] = useState('');

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Criar nova postagem',
      headerStyle: {
        backgroundColor: '#F5E1C5',
      },
      headerTitleStyle: {
        color: '#00838F',
        fontWeight: 'bold',
      },
    });
  }, [navigation]);

  const criarPostagem = async () => {
    if (!titulo || !autor || !conteudo) {
      Alert.alert('Erro', 'Preencha todos os campos!');
      return;
    }

    try {
      await api.post('/posts', {
        titulo,
        autor,
        conteudo,
      });

      Alert.alert('Sucesso', 'Postagem criada com sucesso!');
      navigation.replace('Home');
    } catch (error) {
      console.error('Erro ao criar postagem:', error);
      Alert.alert('Erro', 'Não foi possível criar a postagem.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Criar nova postagem</Text>

      <Text style={styles.label}>Título:</Text>
      <TextInput
        style={styles.input}
        value={titulo}
        onChangeText={setTitulo}
      />

      <Text style={styles.label}>Autor:</Text>
      <TextInput
        style={styles.input}
        value={autor}
        onChangeText={setAutor}
      />

      <Text style={styles.label}>Conteúdo:</Text>
      <TextInput
        style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
        value={conteudo}
        onChangeText={setConteudo}
        multiline
      />

      <TouchableOpacity style={styles.botaoCriar} onPress={criarPostagem}>
        <Text style={styles.textoBotao}>Publicar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botaoCancelar}
        onPress={() => navigation.replace('Home')}
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
  botaoCriar: {
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
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#DB1919',
    alignItems: 'center',
  },
  textoCancelar: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
});