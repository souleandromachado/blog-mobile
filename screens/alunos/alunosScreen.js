import React, { useLayoutEffect, useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
  RefreshControl,
} from 'react-native';
import axios from 'axios';

const ITEMS_POR_PAGINA = 4;

export default function AlunosScreen({ navigation }) {
  const [alunos, setAlunos] = useState([]);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [refreshing, setRefreshing] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Lista de Alunos',
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

  const buscarAlunos = useCallback(async () => {
    setRefreshing(true);
    try {
      const response = await axios.get('https://blog-api-ld0z.onrender.comalunos');
      setAlunos(response.data); // Assumindo que o retorno é array de alunos com id, nome e curso
      setPaginaAtual(1); // Reseta para página 1 ao atualizar dados
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível buscar os alunos.');
      console.error(error);
    } finally {
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    buscarAlunos();
  }, [buscarAlunos]);

  const deletarAluno = (id) => {
    Alert.alert(
      'Confirmar exclusão',
      'Tem certeza que deseja excluir este aluno?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          onPress: async () => {
            try {
              await axios.delete(`https://blog-api-ld0z.onrender.comalunos/${id}`);
              Alert.alert('Sucesso', 'Aluno excluído.');
              buscarAlunos();
            } catch (error) {
              Alert.alert('Erro', 'Não foi possível excluir o aluno.');
              console.error(error);
            }
          },
          style: 'destructive',
        },
      ]
    );
  };

  const alunosPaginados = alunos.slice(
    (paginaAtual - 1) * ITEMS_POR_PAGINA,
    paginaAtual * ITEMS_POR_PAGINA
  );

  const proximaPagina = () => {
    if (paginaAtual * ITEMS_POR_PAGINA < alunos.length) {
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
      <Text style={styles.titulo}>Lista de Alunos</Text>
      <FlatList
        data={alunosPaginados}
        keyExtractor={(item) => (item.id ? item.id.toString() : Math.random().toString())}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={buscarAlunos} />
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.nome}>{item.nome}</Text>
            <Text style={styles.curso}>{item.curso}</Text>

            <View style={styles.botoesLinha}>
              <TouchableOpacity
                style={[styles.botao, styles.botaoEditar]}
                onPress={() =>
                  navigation.navigate('EditarAluno', { aluno: item, onGoBack: buscarAlunos })
                }
              >
                <Text style={styles.textoBotao}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.botao, styles.botaoExcluir]}
                onPress={() => deletarAluno(item._id)}
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
          disabled={paginaAtual * ITEMS_POR_PAGINA >= alunos.length}
          style={[
            styles.paginaBotao,
            paginaAtual * ITEMS_POR_PAGINA >= alunos.length &&
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
    color: '#333',
    fontWeight: 'bold',
  },
  curso: {
    fontSize: 14,
    color: '#555',
    marginTop: 2,
  },
  botoesLinha: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
    marginTop: 10,
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
