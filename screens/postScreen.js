import React, { useState, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useAuth } from '../authContext';

export default function PostScreen({ route, navigation }) {
  const { id, titulo, autor, conteudo, onDelete } = route.params;
    const { isAuthenticated, logout } = useAuth();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Postagem',
      headerStyle: {
        backgroundColor: '#F5E1C5',
      },
      headerTitleStyle: {
        color: '#00838F',
        fontWeight: 'bold',
      },
      headerLeft: () => (
        <View style={{ paddingRight: 10 }}>
          <TouchableOpacity
            onPress={() => {
                navigation.replace('Home');
            }}
            style={{
              backgroundColor: '#4CAF50',
              paddingVertical: 6,
              marginHorizontal: -3,
              paddingHorizontal: 2,
              borderRadius: 3,
            }}
          >
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 14 }}>
              Voltar
            </Text>
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

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
            onDelete(id);
            navigation.replace('Home');
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

      {isAuthenticated && (
        <>
          <TouchableOpacity
            style={styles.botaoEditar}
            onPress={() => navigation.replace('EditPost', { id, titulo, autor, conteudo })}
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
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9'
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#00838F'
  },
  autor: {
    fontSize: 16,
    color: '#00838F',
    marginBottom: 20
  },
  conteudo: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333'
  },
  botaoEditar: {
    marginTop: 20,
    backgroundColor: '#00838F',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  botaoDeletar: {
    backgroundColor: '#d32f2f',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
