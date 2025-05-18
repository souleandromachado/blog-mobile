import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/homeScreen';
import LoginScreen from './screens/loginScreen';
import PostScreen from './screens/postScreen';
import EditPostScreen from './screens/editPostScreen';
import CreatePostScreen from './screens/createPostScreen';
import AdminScreen from './screens/adminScreen';
import AlunosScreen from './screens/alunos/alunosScreen';
import ProfessoresScreen from './screens/professores/professoresScreen';
import EditarProfessor from './screens/professores/editarProfessor';
import EditarAluno from './screens/alunos/editarAluno';
import CadastrarProfessor from './screens/professores/cadastrarProfessor';
import CadastrarAluno from './screens/alunos/cadastrarAluno';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Post" component={PostScreen} />
        <Stack.Screen name="EditPost" component={EditPostScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="CreatePost" component={CreatePostScreen} options={{ title: 'Nova Postagem' }} />
        <Stack.Screen name="AdminScreen" component={AdminScreen} options={{ title: 'Administração' }} />
        <Stack.Screen name="AlunosScreen" component={AlunosScreen} options={{ title: 'Alunos' }} />
        <Stack.Screen name="ProfessoresScreen" component={ProfessoresScreen} />
        <Stack.Screen name="EditarProfessor" component={EditarProfessor} />
        <Stack.Screen name="EditarAluno" component={EditarAluno} />
        <Stack.Screen name="CadastrarProfessor" component={CadastrarProfessor} />
        <Stack.Screen name="CadastrarAluno" component={CadastrarAluno} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
