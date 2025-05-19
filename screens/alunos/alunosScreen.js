import React, { useLayoutEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';

const alunosExemplo = [
  { id: '1', nome: 'Lucas Silva' },
  { id: '2', nome: 'Fernanda Costa' },
  { id: '3', nome: 'Rafael Lima' },
  { id: '4', nome: 'Juliana Rocha' },
  { id: '5', nome: 'Carlos Eduardo' },
  { id: '6', nome: 'Mariana Alves' },
  // Adicione mais para testar paginação
];

const ITEMS_POR_PAGINA = 4;

export default function AlunosScreen({ navigation }) {
  const [alunos, setAlunos] = useState(alunosExemplo);
  const [paginaAtual, setPaginaAtual] = useState(1);

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

  const deletarAluno = (id) => {
    Alert.alert(
      'Confirmar exclusão',
      'Tem certeza que deseja excluir este aluno?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          onPress: () =>
            setAlunos((prev) => prev.filter((aluno) => aluno.id !== id)),
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
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.nome}>{item.nome}</Text>

            <View style={styles.botoesLinha}>
              <TouchableOpacity
                style={[styles.botao, styles.botaoEditar]}
                onPress={() =>
                  navigation.replace('EditarAluno', { aluno: item })
                }
              >
                <Text style={styles.textoBotao}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.botao, styles.botaoExcluir]}
                onPress={() => deletarAluno(item.id)}
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
