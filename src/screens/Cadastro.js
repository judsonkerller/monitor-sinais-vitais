import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, SafeAreaView } from 'react-native';
import { Cadastrar } from '../services/requisicoesFirebase';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons'; 
import { TouchableOpacity } from 'react-native';
import Alerta from '../components/Alerta';

const Cadastro = () => {
  const navigation = useNavigation();

  const [nome, setNome] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [email, setEmail] = useState('');
  const [mensagemError, setMensagemError] = useState('');
  const [statusError, setStatusError] = useState('');

  async function realizarCadastro() {
    const resultado = await Cadastrar(email, senha);
    setStatusError('firebase')
    if(resultado == 'sucesso'){
      setMensagemError('Usuário criado com sucesso!')
      setNome('')
      setSenha('')
      setConfirmarSenha('')
      setEmail('')
      
      navigation.goBack();
    } else {
      setMensagemError(resultado)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.userIcon}>
        <FontAwesome name="user-plus" size={52} color="#3DBDEC" />
      </View>
      
      <TextInput
        placeholder="Nome"
        value={nome}
        onChangeText={texto => setNome(texto)}
        style={styles.input}
        error={statusError == 'nome'}
        />
      <TextInput
        placeholder="Senha"
        secureTextEntry
        value={senha}
        onChangeText={texto => setSenha(texto)}
        style={styles.input}
        error={statusError == senha}
        keyboardType="numeric"
        />
      <TextInput
        placeholder="Confirmar Senha"
        secureTextEntry
        value={confirmarSenha}
        onChangeText={texto => setConfirmarSenha(texto)}
        style={styles.input}
        error={statusError == 'confirmarSenha'}
        keyboardType="numeric"
        />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={texto => setEmail(texto)}
        style={styles.input}
        error={statusError == 'email'}
        />
         
        <Alerta 
          mensagem={mensagemError}
          error={statusError == 'firebase'}
          setError={setStatusError}
        />
      
      <TouchableOpacity style={styles.signup} onPress={() => realizarCadastro()}>
        <Text style={styles.textSignup}>Cadastrar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Cadastro;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center'
  },
  userIcon: {
    marginTop: -172,
    marginBottom: 40,
  },  
  input: {
    backgroundColor: '#e6ebe6',
    width: '100%',
    marginBottom: 15,
    color: '#a9b0a9',
    fontSize: 17,
    borderRadius: 7,
    padding: 10,
  },
  logo: {
    width: '50%',
    height: '50%',
    opacity: 0.09,
    position: 'absolute',
    top: -50,
    right: 20
  },
  signup: {
    position: "absolute",
    bottom: 16,
    padding: 16,
    width: '100%',
    borderRadius: 8,
    backgroundColor: '#1F2B5B',
    alignItems: "center",
  },
  alert: {
    marginBottom: 10
  },
  textSignup: {
    color: '#fff',
    fontWeight: '700',
    letterSpacing: 1,
  }
})
