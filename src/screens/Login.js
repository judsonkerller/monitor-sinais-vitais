import React, { useState } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { getAuth, signInWithEmailAndPassword } from '@firebase/auth';

const LoginScreen = () => {

  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  async function realizarLogin() {
    const auth = getAuth();

    await signInWithEmailAndPassword(auth, email, senha)
      .then(() => {
        console.log('Usuário logado com sucesso!');
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [
              { name: 'Principal' },
            ],
          })
        );
      })
      .catch((erro) => {
        console.log("Não logou - ", erro.message);
      });
  }

  return (
    <SafeAreaView style={styles.container} >
      <Image
        style={styles.logo}
        source={require('../../assets/logo-principal.png')}
      />
      <KeyboardAvoidingView>

        <View style={styles.inputContainer} >
          <TextInput
            style={styles.input}
            placeholder='Email'
            autoCorrect={false}
            onChangeText={email => setEmail(email)} />

          <TextInput
            style={styles.input}
            secureTextEntry
            placeholder='Senha'
            autoCorrect={false}
            onChangeText={senha => setSenha(senha)} />

          <TouchableOpacity style={styles.btnAcessar} onPress={() => realizarLogin()}>
            <Text style={styles.acessarText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnNovaConta} onPress={() => { navigation.navigate('Novo Cadastro') }}>
            <Text style={styles.novaContaText} >Criar Nova Conta</Text>
          </TouchableOpacity>

        </View>
      </KeyboardAvoidingView>

    </SafeAreaView>
  );
}


export default LoginScreen;

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  logo: {
    width: 400,
    height: 300,
    marginTop: -170

  },
  inputContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    backgroundColor: '#e6ebe6',
    width: 300,
    marginBottom: 15,
    color: '#a9b0a9',
    fontSize: 17,
    borderRadius: 7,
    padding: 10,
  },
  btnAcessar: {
    backgroundColor: '#1F2B5B',
    width: '100%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
  },
  acessarText: {
    color: '#f5faf5',
    fontSize: 18,
    fontWeight: 700,
    letterSpacing: 1,
  },
  btnNovaConta: {
    marginTop: 10,
  },
  novaContaText: {
    color: '#1e1f1e',
  }
});
