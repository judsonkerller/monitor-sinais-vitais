import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, TouchableOpacity } from 'react-native';
import Cadastro from './src/screens/cadastro';
import LoginScreen from './src/screens/Login';

export default function App() {

  return (
    <KeyboardAvoidingView style={styles.background}>
      <View style={styles.container}>
        <TextInput
        style={styles.input}
        placeholder='Email'
        autoCorrect={false}
        onChangeText={()=> {}}
        />

        <TextInput
        style={styles.input}
        placeholder='Senha'
        autoCorrect={false}
        onChangeText={()=> {}}
        />
          
        <TouchableOpacity style={styles.btnAcessar}>
          <Text style={styles.acessarText}>Acessar</Text>
          
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnNovaConta}>
          <Text style={styles.novaContaText}>Criar Nova Conta</Text>
        </TouchableOpacity>

        {/* <LoginScreen />
        <StatusBar style="auto" /> */}
      </View>
    </KeyboardAvoidingView>
  );
}


const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    paddingBottom: 30,
  },
  input:{
    backgroundColor: '#e6ebe6',
    width: '90%',
    marginBottom: 15,
    color: '#a9b0a9',
    fontSize: 17,
    borderRadius: 7,
    padding: 10,    
  },
  btnAcessar:{
    backgroundColor: '#35AAFF',
    width: '90%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
  },
  acessarText:{
    color: '#f5faf5',
    fontSize: 18,  
  },
  btnNovaConta:{
    marginTop: 10,
  },
  novaContaText:{
    color:'#1e1f1e',
  }
  

});
