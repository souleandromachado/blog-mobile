import React, { useLayoutEffect, useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import { getPosts, deletePost } from '../services/api';

export default function HomeScreen({ navigation }) {
  const [posts, setPosts] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [busca, setBusca] = useState('');
  const [isLogado, setIsLogado] = useState(true);

  const buscarPosts = async () => {
    setCarregando(true);
    const resultado = await getPosts();
    if (resultado.success === false) {
      alert(resultado.error);
      setPosts([]);
    } else {
      setPosts(resultado);
    }
    setCarregando(false);
  };

  useFocusEffect(
    useCallback(() => {
      buscarPosts();
    }, [])
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Colégio Lumiar',
      headerStyle: {
        backgroundColor: '#F5E1C5',
        headerTitleAlign: 'left',
      },
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#00838F',
      },
      headerRight: () => (
        <View style={{ paddingRight: 10 }}>
          <TouchableOpacity
            onPress={() => {
              if (isLogado) {
                setIsLogado(false);
              } else {
                navigation.replace('Login', { setIsLogado });
              }
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
              {isLogado ? 'Sair' : 'Login'}
            </Text>
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation, isLogado]);

  const handleDeletarPost = async (id) => {
    const resultado = await deletePost(id);
    if (resultado.success) {
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
    } else {
      alert(resultado.error);
    }
  };

  const postsFiltrados = posts.filter((post) => {
    const textoBusca = busca.toLowerCase();
    return (
      post.titulo.toLowerCase().includes(textoBusca) ||
      post.autor.toLowerCase().includes(textoBusca) ||
      post.conteudo.toLowerCase().includes(textoBusca)
    );
  });

  if (carregando) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#00796b" />
        <Text>Carregando postagens...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {!isLogado && (
        <View style={styles.botoesAlunosContainer}>
          <TouchableOpacity
            style={[styles.botaoCadastroAluno, styles.botaoLadoALado]}
            onPress={() => navigation.replace('CadastrarAluno')}
          >
            <Text style={styles.botaoTexto}>+ Novo Aluno</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.botaoAlunos, styles.botaoLadoALado]}
            onPress={() => navigation.replace('AlunosScreen')}
          >
            <Text style={styles.botaoTexto}>Alunos</Text>
          </TouchableOpacity>
        </View>
      )}

      {isLogado && (
        <View style={styles.botoesProfessoresContainer}>
          <TouchableOpacity
            style={[styles.botaoCadastroProf, styles.botaoLadoALado]}
            onPress={() => navigation.replace('CadastrarProfessor')}
          >
            <Text style={styles.botaoTexto}>+ Novo Professor</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.botaoProfessores, styles.botaoLadoALado]}
            onPress={() => navigation.replace('ProfessoresScreen')}
          >
            <Text style={styles.botaoTexto}>Professores</Text>
          </TouchableOpacity>
        </View>
      )}

      <TextInput
        placeholder="Buscar postagens..."
        value={busca}
        onChangeText={setBusca}
        style={styles.campoBusca}
      />

      <FlatList
        data={postsFiltrados}
        keyExtractor={(item) => (item.id ? item.id.toString() : Math.random().toString())}
        ListEmptyComponent={<Text style={{ marginTop: 20 }}>Nenhuma postagem encontrada.</Text>}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.replace('Post', {
                id: item.id,
                titulo: item.titulo,
                autor: item.autor,
                conteudo: item.conteudo,
                onDelete: handleDeletarPost,
              })
            }
          >
            <View style={styles.card}>
              <Text style={styles.postTitulo}>{item.titulo}</Text>
              <Text style={styles.postAutor}>por {item.autor}</Text>
              <Text style={styles.postTrecho}>
                {item.conteudo.length > 50
                  ? item.conteudo.substring(0, 50) + '...'
                  : item.conteudo}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />

      {isLogado && (
        <View style={styles.botoesContainer}>
          <TouchableOpacity
            style={[styles.botao, styles.botaoCriar]}
            onPress={() => navigation.replace('CreatePost')}
          >
            <Text style={styles.botaoTexto}>+ Criar novo post</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.botao, styles.botaoAdministrar]}
            onPress={() =>
              navigation.replace('AdminScreen', {
                posts,
                deletarPost: handleDeletarPost,
              })
            }
          >
            <Text style={styles.botaoTexto}>Administrar Posts</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  campoBusca: {
    backgroundColor: '#D9D9D9',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 10,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  card: {
    backgroundColor: '#D9D9D9',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  postTitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00838F',
  },
  postAutor: {
    fontSize: 14,
    marginTop: 4,
    color: '#00838F',
  },
  postTrecho: {
    fontSize: 14,
    color: '#444',
    marginTop: 4,
    fontStyle: 'italic',
  },
  botoesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  botao: {
    flex: 1,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  botaoCriar: {
    backgroundColor: '#4CAF50',
  },
  botaoAdministrar: {
    backgroundColor: '#00838F',
    marginLeft: 10,
  },
  botaoTexto: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  botaoAlunos: {
    backgroundColor: '#00838F',
  },
  botaoProfessores: {
    backgroundColor: '#00838F',
  },
  botaoCadastroProf: {
    backgroundColor: '#4CAF50',
  },
  botoesProfessoresContainer: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 15,
  },
  botaoLadoALado: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  botoesAlunosContainer: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 15,
  },
  botaoCadastroAluno: {
    backgroundColor: '#4CAF50',
  },
});