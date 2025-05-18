import React, { useLayoutEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';

const professoresExemplo = [
  { id: '1', nome: 'Prof. Ana Clara', disciplina: 'Português' },
  { id: '2', nome: 'Prof. João Pedro', disciplina: 'Matemática' },
  { id: '3', nome: 'Prof. Marcos Lima', disciplina: 'Ciências' },
  { id: '4', nome: 'Prof. Fernanda Souza', disciplina: 'História' },
  { id: '5', nome: 'Prof. Min Yoongi', disciplina: 'Geografia' },
  { id: '6', nome: 'Prof. Carla Dias', disciplina: 'Educação Física' },
];

const ITEMS_POR_PAGINA = 4;

export default function ProfessoresScreen({ navigation }) {
  const [professores, setProfessores] = useState(professoresExemplo);
  const [paginaAtual, setPaginaAtual] = useState(1);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Home',
      headerStyle: {
        backgroundColor: '#F5E1C5',
      },
      headerTitleStyle: {
        color: '#00838F',
        fontWeight: 'bold',
        fontSize: 20,
      },
    });
  }, [navigation]);

  const deletarProfessor = (id) => {
    Alert.alert(
      'Confirmar exclusão',
      'Tem certeza que deseja excluir este professor?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          onPress: () =>
            setProfessores((prev) => prev.filter((prof) => prof.id !== id)),
          style: 'destructive',
        },
      ]
    );
  };

  const professoresPaginados = professores.slice(
    (paginaAtual - 1) * ITEMS_POR_PAGINA,
    paginaAtual * ITEMS_POR_PAGINA
  );

  const proximaPagina = () => {
    if (paginaAtual * ITEMS_POR_PAGINA < professores.length) {
      setPaginaAtual(paginaAtual + 1);
    }
  };

  const paginaAnterior = () => {
    if (paginaAtual > 1) {
      setPaginaAtual(paginaAtual - 1);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Lista de Professores</Text>
      <FlatList
        data={professoresPaginados}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.nome}>{item.nome}</Text>
            <Text style={styles.disciplina}>{item.disciplina}</Text>

            <View style={styles.botoesLinha}>
              <TouchableOpacity
                style={[styles.botao, styles.botaoEditar]}
                onPress={() =>
                  navigation.navigate('EditarProfessor', {
                    id: item.id,
                    nome: item.nome,
                    disciplina: item.disciplina,
                  })
                }
              >
                <Text style={styles.textoBotao}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.botao, styles.botaoExcluir]}
                onPress={() => deletarProfessor(item.id)}
              >
                <Text style={styles.textoBotao}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <View style={styles.paginacao}>
        <TouchableOpacity
          onPress={paginaAnterior}
          disabled={paginaAtual === 1}
          style={[
            styles.paginaBotao,
            paginaAtual === 1 && styles.botaoDesativado,
          ]}
        >
          <Text style={styles.textoBotao}>Anterior</Text>
        </TouchableOpacity>

        <Text style={styles.numeroPagina}>Página {paginaAtual}</Text>

        <TouchableOpacity
          onPress={proximaPagina}
          disabled={paginaAtual * ITEMS_POR_PAGINA >= professores.length}
          style={[
            styles.paginaBotao,
            paginaAtual * ITEMS_POR_PAGINA >= professores.length &&
              styles.botaoDesativado,
          ]}
        >
          <Text style={styles.textoBotao}>Próxima</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00838F',
    marginBottom: 15,
  },
  card: {
    backgroundColor: '#D9D9D9',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  nome: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  disciplina: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
    marginBottom: 10,
  },
  botoesLinha: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
  },
  botao: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
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
  paginacao: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  paginaBotao: {
    backgroundColor: '#00838F',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
  },
  numeroPagina: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00838F',
  },
  botaoDesativado: {
    backgroundColor: '#ccc',
  },
});