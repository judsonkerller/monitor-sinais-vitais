import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';

const CadastroScreen = () => {
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
    <View>
      <TextInput
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        placeholder="Senha"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />
      <TextInput
        placeholder="Confirmar Senha"
        secureTextEntry
        value={confirmarSenha}
        onChangeText={setConfirmarSenha}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <Button
        title="Cadastrar"
        onPress={cadastrar}
      />
    </View>
  );
};

export default CadastroScreen;
