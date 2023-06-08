import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, SafeAreaView } from 'react-native';
import { Cadastrar } from '../services/requisicoesFirebase';

const Cadastro = () => {
  const [nome, setNome] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [email, setEmail] = useState('');
  const [mensagemError, setMensagemError] = useState('');
  const [statusError, setStatusError] = useState('');

  async function realizarCadastro() {
    // if (nome != '') {
    //   setMensagemError('Digite seu nome');
    //   setStatusError('nome');
    // } else if (senha == '') {
    //   setMensagemError('Digite sua senha');
    //   setStatusError('senha');
    // } else if (confirmarSenha != senha) {
    //   setMensagemError('As senhas estão diferentes');
    //   setStatusError('confirmarSenha');
    // } else if (email == '') {
    //   setMensagemError('Digite seu email');
    //   setStatusError('email');
    // } else {
    //   await Cadastrar(nome, senha, confirmarSenha, email);
    //   setNome('')
    //   setSenha('')
    //   setConfirmarSenha('')
    //   setEmail('')
    //   setMensagemError('')
    //   setStatusError('')
    // }

    await Cadastrar(email, senha);
      setNome('')
      setSenha('')
      setConfirmarSenha('')
      setEmail('')
  }

  return (
    <SafeAreaView style={styles.container}>
    <View >
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
        />
      <TextInput
        placeholder="Confirmar Senha"
        secureTextEntry
        value={confirmarSenha}
        onChangeText={texto => setConfirmarSenha(texto)}
        style={styles.input}
        error={statusError == 'confirmarSenha'}
        />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={texto => setEmail(texto)}
        style={styles.input}
        error={statusError == 'email'}
        />
      <Button
        title="Cadastrar"
        onPress={() => realizarCadastro()}
        style={styles.input}
        />
    </View>
        </SafeAreaView>
  );
};

export default Cadastro;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  input: {
    borderWidth: 2,
    borderColor: '#ccc',
    marginBottom: 20,
    color: '#ccc'
  },

})
