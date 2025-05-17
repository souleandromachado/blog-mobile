// screens/EditPostScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';

export default function EditPostScreen({ route, navigation }) {
  const { titulo: tituloInicial, autor: autorInicial, conteudo: conteudoInicial } = route.params;

  const [titulo, setTitulo] = useState('');
  const [conteudo, setConteudo] = useState('');
  const [autor, setAutor] = useState('');

  const salvarEdicao = () => {
    // Aqui você salvaria no backend futuramente
    alert('Postagem atualizada!');
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
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
        style={styles.input}
        value={conteudo}
        onChangeText={setConteudo}
      />

      <Button title="Salvar Alterações" onPress={salvarEdicao} color="#00796b" />
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
