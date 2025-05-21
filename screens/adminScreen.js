import React, { useLayoutEffect, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

export default function AdminScreen({ navigation }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const API_URL = 'https://blog-api-ld0z.onrender.com';

  // Função para carregar os posts da API
  const carregarPosts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/posts`);
      setPosts(response.data);
    } catch (error) {
      Alert.alert('Erro', 'Falha ao carregar posts.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Chama carregarPosts assim que o componente monta
  useEffect(() => {
    carregarPosts();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Administrar Posts',
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

  const confirmarExclusao = (id) => {
    Alert.alert(
      'Excluir Postagem',
      'Tem certeza que deseja excluir este post?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => deletarPost(id),
        },
      ]
    );
  };

  // Função que exclui post na API e atualiza o estado
  const deletarPost = async (id) => {
    try {
      await axios.delete(`${API_URL}/posts/${id}`);
      Alert.alert('Sucesso', 'Post deletado com sucesso!');
      // Atualiza estado removendo o post deletado
      setPosts((postsAtuais) => postsAtuais.filter(post => post._id !== id));
    } catch (error) {
      console.error('Erro ao deletar post:', error);
      Alert.alert('Erro', 'Falha ao excluir o post.');
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.titulo}>{item.titulo}</Text>
            <Text style={styles.autor}>por {item.autor}</Text>
            <Text style={styles.conteudo}>
              {item.conteudo.length > 50 ? item.conteudo.substring(0, 50) + '...' : item.conteudo}
            </Text>

            <View style={styles.acoes}>
              <TouchableOpacity
                style={[styles.botao, styles.botaoEditar]}
                onPress={() =>
                  navigation.replace('EditPost', {
                    id: item._id,
                    titulo: item.titulo,
                    autor: item.autor,
                    conteudo: item.conteudo,
                  })
                }
              >
                <Text style={styles.textoBotao}>Editar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.botao, styles.botaoExcluir]}
                onPress={() => confirmarExclusao(item._id)}
              >
                <Text style={styles.textoBotao}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={<Text style={{ marginTop: 20 }}>Nenhuma postagem encontrada.</Text>}
        refreshing={loading}
        onRefresh={carregarPosts}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  card: {
    backgroundColor: '#D9D9D9',
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
  },
  titulo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00838F',
  },
  autor: {
    fontSize: 14,
    color: '#00838F',
    marginTop: 4,
  },
  conteudo: {
    fontSize: 14,
    fontStyle: 'italic',
    marginVertical: 8,
  },
  acoes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  botao: {
    flex: 1,
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  botaoEditar: {
    backgroundColor: '#00838F',
  },
  botaoExcluir: {
    backgroundColor: '#DB1919',
  },
  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
