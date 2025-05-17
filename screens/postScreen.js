import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';

export default function PostScreen({ route, navigation }) {
  const { id, titulo, autor, conteudo, onDelete } = route.params;

  const [isLogado, setIsLogado] = useState(false); // Simule login

  const handleDeletar = () => {
    Alert.alert(
      'Confirmação',
      'Tem certeza que deseja deletar esta postagem?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Deletar',
          style: 'destructive',
          onPress: () => {
            onDelete(id); // Chama função passada para deletar
            navigation.goBack(); // Volta para home
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>{titulo}</Text>
      <Text style={styles.autor}>por {autor}</Text>
      <Text style={styles.conteudo}>{conteudo}</Text>

      {isLogado && (
        <>
          <TouchableOpacity
            style={styles.botaoEditar}
            onPress={() => navigation.navigate('EditPost', { id, titulo, autor, conteudo })}
          >
            <Text style={styles.textoBotao}>Editar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.botaoDeletar} onPress={handleDeletar}>
            <Text style={styles.textoBotao}>Deletar</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f9f9f9' },
  titulo: { fontSize: 24, fontWeight: 'bold', marginBottom: 10, color: '#004d40' },
  autor: { fontSize: 16, color: '#666', marginBottom: 20 },
  conteudo: { fontSize: 16, lineHeight: 24, color: '#333' },
  botaoEditar: {
    backgroundColor: '#00796b',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  botaoDeletar: {
    backgroundColor: '#d32f2f',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
