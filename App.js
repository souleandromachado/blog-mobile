import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/homeScreen';
import LoginScreen from './screens/loginScreen';
import PostScreen from './screens/postScreen';
import EditPostScreen from './screens/editPostScreen';
import CreatePostScreen from './screens/createPostScreen';

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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
