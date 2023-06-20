import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/screens/Login';
import Cadastro from './src/screens/Cadastro';
import CadastroSinais from './src/screens/CadastroSinais';
import DetalhesSinais from './src/screens/DetalhesSinais';
import Principal from './src/screens/Principal';

const Stack = createStackNavigator();

const App = () => {
  return (

    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="O nome tá show, West"
          component={LoginScreen}
          options={{ headerShown: false }}
          />

        <Stack.Screen 
          name='Novo Cadastro'
          component={Cadastro}
          options={{ 
            headerShown: true
          }}
        />

        <Stack.Screen 
          name='Cadastro Sinais Vitais'
          component={CadastroSinais}
          options={{
            headerShown: true
          }}
        />

        <Stack.Screen 
          name='Detalhes Sinais Vitais'
          component={DetalhesSinais}
          options={{
            headerShown: true
          }}
        />

        <Stack.Screen 
          name='Principal'
          component={Principal}
          options={{
            headerShown: true
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
          
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
})