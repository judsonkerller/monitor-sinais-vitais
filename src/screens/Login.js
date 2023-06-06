import React from 'react';
import { View, Button, Alert } from 'react-native';
import * as Google from 'expo-google-app-auth';
import firebase from 'firebase/app';

export default function LoginScreen() {
  // Função para fazer login com o Google
  const signInWithGoogleAsync = async () => {
    try {
      const result = await Google.logInAsync({
        // Configure as informações do seu app do Google
        androidClientId: 'SEU_ANDROID_CLIENT_ID',
        iosClientId: 'SEU_IOS_CLIENT_ID',
        scopes: ['profile', 'email'],
      });

      if (result.type === 'success') {
        // Acessa o token de autenticação do Google
        const { idToken, accessToken } = result;
        
        // Cria uma credencial do Google usando o token
        const credential = firebase.auth.GoogleAuthProvider.credential(idToken, accessToken);
            
        // Faz o login com a credencial
        firebase.auth().signInWithCredential(credential)
          .then(() => {
            // Login bem sucedido, faça o que precisar aqui
            Alert.alert('Sucesso', 'Login com Google bem sucedido!');
          })
          .catch(error => {
            // Tratamento de erro
            Alert.alert('Erro', 'Falha no login com Google.');
            console.error(error);
          });
      } else {
        // Login cancelado pelo usuário
        Alert.alert('Aviso', 'O login com Google foi cancelado.');
      }
    } catch (e) {
      // Erro durante o processo de login
      Alert.alert('Erro', 'Ocorreu um erro durante o login com Google.');
      console.error(e);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Login com Google" onPress={signInWithGoogleAsync} />
    </View>
  );
}
