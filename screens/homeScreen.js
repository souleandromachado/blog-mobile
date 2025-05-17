import React, { useEffect, useLayoutEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Button,
  TextInput,
} from 'react-native';

const postsExemplo = [
  {
    id: '1',
    titulo: 'Bem-vindos ao novo semestre!',
    autor: 'Prof. Ana',
    conteudo: 'Estamos empolgados para começar com novas atividades educativas.',
  },
  {
    id: '2',
    titulo: 'Dicas para a feira de ciências',
    autor: 'Prof. João',
    conteudo: 'Preparem seus experimentos com criatividade!',
  },
  {
    id: '3',
    titulo: 'Aula extra de matemática',
    autor: 'Prof. Marcos',
    conteudo: 'Revisaremos frações e porcentagens com exercícios práticos.',
  },
];

export default function HomeScreen({ navigation }) {
  const [posts, setPosts] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [busca, setBusca] = useState('');
  const [isLogado, setIsLogado] = useState(false);

useLayoutEffect(() => {
  navigation.setOptions({
    title: 'Colégio Lumiar',
    headerStyle: {
      backgroundColor: '#F5E1C5',
      height: 70,
    },
    headerTitleStyle: {
      fontWeight: 'bold',
      fontSize: 20,
      color: '#00838F',
    },
    headerTitleContainerStyle: {
      paddingTop: 20,
    },
    headerRight: () => (
      <View style={{ paddingRight: 10, paddingTop: 20 }}>
        <TouchableOpacity
          onPress={() => {
            if (isLogado) {
              setIsLogado(false);
            } else {
              navigation.navigate('Login', { setIsLogado });
            }
          }}
          style={{
            backgroundColor: '#4CAF50',
            paddingVertical: 6,
            paddingHorizontal: 12,
            borderRadius: 3,
          }}
        >
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 14 }}>
            {isLogado ? 'Sair' : 'Sou Docente'}
          </Text>
        </TouchableOpacity>
      </View>
    ),
  });
}, [navigation, isLogado]);


  useEffect(() => {
    setTimeout(() => {
      setPosts(postsExemplo);
      setCarregando(false);
    }, 1000);
  }, []);

  const deletarPost = (id) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
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
      {/* Campo de busca */}
      <TextInput
        placeholder="Buscar postagens..."
        value={busca}
        onChangeText={setBusca}
        style={styles.campoBusca}
      />

      <FlatList
        data={postsFiltrados}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text style={{ marginTop: 20 }}>Nenhuma postagem encontrada.</Text>}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Post', {
                id: item.id,
                titulo: item.titulo,
                autor: item.autor,
                conteudo: item.conteudo,
                onDelete: deletarPost,
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
        <TouchableOpacity
          style={styles.botaoNovaPostagem}
          onPress={() => navigation.navigate('CreatePost')}
        >
          <Text style={styles.botaoTexto}>+ Nova Postagem</Text>
        </TouchableOpacity>
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
    color: '#555',
    marginTop: 4,
    color: '#00838F',
  },
  postTrecho: {
    fontSize: 14,
    color: '#444',
    marginTop: 4,
    fontStyle: 'italic',
  },
  botaoNovaPostagem: {
    backgroundColor: '#00796b',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  botaoTexto: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
