import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';

const Cadastro = () => {
  const [nome, setNome] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [email, setEmail] = useState('');

  const cadastrar = async () => {
    // Validação dos campos
    if (!nome || !senha || !confirmarSenha || !email) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    if (senha !== confirmarSenha) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return;
    }

    // Dados para enviar para a API
    const dados = {
      nome,
      senha,
      email,
    };

    try {
      // Chamada para a API usando o fetch ou axios
      const resposta = await fetch('URL_DA_API', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dados),
      });

      // Verificar a resposta da API
      if (resposta.ok) {
        Alert.alert('Sucesso', 'Cadastro realizado com sucesso.');
        // Redirecionar para a próxima tela ou realizar outras ações
      } else {
        Alert.alert('Erro', 'Não foi possível realizar o cadastro.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao processar a requisição.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
        style={styles.input}
      />
      <TextInput
        placeholder="Senha"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
        style={styles.input}
      />
      <TextInput
        placeholder="Confirmar Senha"
        secureTextEntry
        value={confirmarSenha}
        onChangeText={setConfirmarSenha}
        style={styles.input}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <Button
        title="Cadastrar"
        onPress={cadastrar}
        style={styles.input}
      />
    </View>
  );
};

export default Cadastro;

const styles = StyleSheet.create({
  input: {
    borderWidth: 2,
    borderColor: '#ccc',
    marginBottom: 20,
    color: '#ccc'
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }

})
