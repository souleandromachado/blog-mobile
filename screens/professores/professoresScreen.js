import React, { useLayoutEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

const ITEMS_POR_PAGINA = 4;

export default function ProfessoresScreen({ navigation }) {
  const [professores, setProfessores] = useState([]);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [loading, setLoading] = useState(false);

  const API_URL = 'https://blog-api-ld0z.onrender.comprofessores';

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Professores',
      headerStyle: { backgroundColor: '#F5E1C5' },
      headerTitleStyle: {
        color: '#00838F',
        fontWeight: 'bold',
        fontSize: 20,
      },
    });
  }, [navigation]);

  useFocusEffect(
    useCallback(() => {
      carregarProfessores();
    }, [])
  );

  const carregarProfessores = async () => {
    setLoading(true);
    try {
      const resposta = await axios.get(API_URL);
      setProfessores(resposta.data);
    } catch (erro) {
      console.error('Erro ao buscar professores:', erro);
      Alert.alert('Erro', 'Não foi possível carregar os professores.');
    } finally {
      setLoading(false);
    }
  };

  const deletarProfessor = async (id) => {
    Alert.alert(
      'Confirmar exclusão',
      'Tem certeza que deseja excluir este professor?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              await axios.delete(`${API_URL}/${id}`);
              await carregarProfessores();
              Alert.alert('Sucesso', 'Professor excluído com sucesso.');
            } catch (erro) {
              console.error('Erro ao excluir professor:', erro);
              Alert.alert('Erro', 'Não foi possível excluir o professor.');
            }
          },
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

      {loading ? (
        <ActivityIndicator size="large" color="#00838F" />
      ) : (
        <FlatList
          data={professoresPaginados}
          keyExtractor={(item) =>
            item._id ? item._id.toString() : Math.random().toString()
          }
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.nome}>{item.nome}</Text>
              <Text style={styles.disciplina}>{item.materia}</Text>

              <View style={styles.botoesLinha}>
                <TouchableOpacity
                  style={[styles.botao, styles.botaoEditar]}
                  onPress={() =>
                    navigation.replace('EditarProfessor', {
                      id: item._id,
                      nome: item.nome,
                      materia: item.materia,
                      login: item.login,
                      senha: item.senha,
                    })
                  }
                >
                  <Text style={styles.textoBotao}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.botao, styles.botaoExcluir]}
                  onPress={() => deletarProfessor(item._id)}
                >
                  <Text style={styles.textoBotao}>Excluir</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}

      <View style={styles.paginacao}>
        <TouchableOpacity
          onPress={paginaAnterior}
          disabled={paginaAtual === 1}
          style={[styles.paginaBotao, paginaAtual === 1 && styles.botaoDesativado]}
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
