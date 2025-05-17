// screens/CreatePostScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function CreatePostScreen({ navigation }) {
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [conteudo, setConteudo] = useState('');

  const criarPostagem = () => {
    if (!titulo || !autor || !conteudo) {
      alert('Preencha todos os campos!');
      return;
    }

    // Aqui você salvaria no backend
    alert('Postagem criada com sucesso!');
    navigation.goBack(); // Volta para a tela anterior (HomeScreen)
  };

  return (
    <View style={styles.container}>
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

      <Text style={styles.label}>Autor:</Text>
      <TextInput
        style={styles.input}
        value={autor}
        onChangeText={setAutor}
        placeholder="Nome do professor"
      />

      <Button title="Criar Postagem" onPress={criarPostagem} color="#00796b" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
  },
});