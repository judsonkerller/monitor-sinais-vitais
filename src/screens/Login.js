import React from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const LoginScreen = () => {
  
  const navigation = useNavigation();
  
  return (
    <SafeAreaView style={styles.container}>

      
        <Image
          style={styles.logo}
          source={require('../../assets/logo-principal.png')}
          />
    <KeyboardAvoidingView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder='Email'
          autoCorrect={false}
          onChangeText={() => { } } />

        <TextInput
          style={styles.input}
          placeholder='Senha'
          autoCorrect={false}
          onChangeText={() => { } } />

        <TouchableOpacity style={styles.btnAcessar}>
          <Text style={styles.acessarText}>Acessar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnNovaConta} onPress={() => {navigation.navigate('Novo Cadastro')}}>
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
    width: '25rem',
    height: '25rem',
    marginTop: '-10rem'
  },  
  inputContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  input:{
    backgroundColor: '#e6ebe6',
    width: 300,
    marginBottom: 15,
    color: '#a9b0a9',
    fontSize: 17,
    borderRadius: 7,
    padding: 10,    
  },
  btnAcessar:{
    backgroundColor: '#35AAFF',
    width: '50%',
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
