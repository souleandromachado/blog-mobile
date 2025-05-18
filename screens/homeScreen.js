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

      {!isLogado && (
        <View style={styles.botoesAlunosContainer}>
          <TouchableOpacity
            style={[styles.botaoCadastroAluno, styles.botaoLadoALado]}
            onPress={() => navigation.navigate('CadastrarAluno')}
          >
            <Text style={styles.botaoTexto}>+ Novo Aluno</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.botaoAlunos, styles.botaoLadoALado]}
            onPress={() => navigation.navigate('AlunosScreen')}
          >
            <Text style={styles.botaoTexto}>Alunos</Text>
          </TouchableOpacity>
        </View>
      )}

      {isLogado && (
        <View style={styles.botoesProfessoresContainer}>
          <TouchableOpacity
            style={[styles.botaoCadastroProf, styles.botaoLadoALado]}
            onPress={() => navigation.navigate('CadastrarProfessor')}
          >
            <Text style={styles.botaoTexto}>+ Novo Professor</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.botaoProfessores, styles.botaoLadoALado]}
            onPress={() => navigation.navigate('ProfessoresScreen')}
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
      <View style={styles.botoesContainer}>
        <TouchableOpacity
          style={[styles.botao, styles.botaoCriar]}
          onPress={() => navigation.navigate('CreatePost')}
        >
          <Text style={styles.botaoTexto}>+ Criar novo post</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.botao, styles.botaoAdministrar]}
          onPress={() => navigation.navigate('AdminScreen', {
            posts,
            deletarPost,
          })}
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
    marginTop: 20,
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
