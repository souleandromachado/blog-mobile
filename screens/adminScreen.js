import React, {useLayoutEffect} from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';

export default function AdminScreen({ route, navigation }) {
  const { posts, deletarPost } = route.params;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Home',
      headerStyle: {
        backgroundColor: '#F5E1C5',
      },
      headerTitleStyle: {
        color: '#00838F',
        fontWeight: 'bold',
      },
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

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
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
                  navigation.navigate('EditPost', {
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
                onPress={() => confirmarExclusao(item.id)}
              >
                <Text style={styles.textoBotao}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={<Text style={{ marginTop: 20 }}>Nenhuma postagem encontrada.</Text>}
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