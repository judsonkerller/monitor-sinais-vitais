import { useState } from "react";
import { KeyboardAvoidingView, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import moment from "moment/moment";

import { auth } from '../config/firebase';
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const db = getFirestore(auth);

const CadastroSinais = () => {
  const [pressao, setPressao] = useState('');
  const [glicose, setGlicose] = useState('');
  const [temperatura, setTemperatura] = useState('');
  const [batimento, setBatimento] = useState('');

  const navigation = useNavigation();

  async function cadastrarSinaisVitais() {
    const autho = getAuth();
    const user = autho.currentUser;

    if (user) {
      console.log(user.uid);
    } else {
      console.log("Cadastro - Usuário não está logado");
    }

    const collec = collection(db, "/Sinais-Vitais");
    await addDoc(collec, {
      pressao: pressao,
      glicose: glicose,
      temperatura: temperatura,
      batimento: batimento,
      dataCadastro: moment().utcOffset("-03:00").format("DD/MM/YYYY HH:mm:ss"),
      idUsuario: user.uid
    })
      .then((e) => {
        console.log("Registrado");
        navigation.navigate('Detalhes Sinais Vitais', { idSinais: e.id });
      })
      .catch((error) => {
        console.log("Não registrou " + error);
      });
  }

  return (
    <KeyboardAvoidingView
      style={[styles.container, styles.shadowProp, styles.width100]}
    >
      <ScrollView style={[styles.containerScroll, styles.width100]}>
        <View style={styles.width100}>
          <View style={styles.signalsContainer}>
            <Text style={styles.label}>Pressão (mmHg)</Text>
            <TextInput
              style={[styles.input, styles.width100]}
              placeholder="120.80"
              placeholderTextColor="#ccc"
              value={pressao}
              onChangeText={pressao => setPressao(pressao)}
              keyboardType="numeric"
            />
          </View>

          <View style={styles.signalsContainer}>
            <Text style={styles.label}>Glicose (mg/dL)</Text>
            <TextInput
              style={[styles.input, styles.width100]}
              placeholder="98"
              placeholderTextColor="#ccc"
              value={glicose}
              onChangeText={glicose => setGlicose(glicose)}
              keyboardType="numeric"
            />
          </View>

          <View style={styles.signalsContainer}>
            <Text style={styles.label}>Temperatura (°C)</Text>
            <TextInput
              style={[styles.input, styles.width100]}
              placeholder="34"
              placeholderTextColor="#ccc"
              value={temperatura}
              onChangeText={temperatura => setTemperatura(temperatura)}
              keyboardType="numeric"
            />
          </View>

          <View style={styles.signalsContainer}>
            <Text style={styles.label}>Batimento (bpm)</Text>
            <TextInput
              style={[styles.input, styles.width100]}
              placeholder="110"
              placeholderTextColor="#ccc"
              value={batimento}
              onChangeText={batimento => setBatimento(batimento)}
              keyboardType="numeric"
            />
          </View>
        </View>
      </ScrollView>

      <View style={styles.width100}>
        <TouchableOpacity style={[styles.btn, styles.btnSalvar, styles.width100]} onPress={() => cadastrarSinaisVitais()}>
          <Text style={styles.saveText}>Salvar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btn, styles.btnCancelar, styles.width100]} onPress={() => navigation.goBack()}>
          <Text style={styles.saveText}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
};

const styles = StyleSheet.create({
  width100: {
    width: "100%"
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    paddingTop: 40,
    backgroundColor: '#fff',
    height: "100%"
  },
  signalsContainer: {
    padding: 16,
    alignItems: "baseline",
    backgroundColor: '#fafafa',
    borderRadius: 8,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#222'
  },
  containerScroll: {
    height: "100%",
    marginBottom: 16
  },
  label: {
    marginBottom: 8,
    color: '#000',
    fontWeight: "700",
  },
  input: {
    paddingLeft: 8,
    borderWidth: 1,
    borderRadius: 8,
    height: 35
  },
  btn: {
    padding: 16,
    borderRadius: 8,
    alignItems: "center"
  },
  btnSalvar: {
    backgroundColor: '#7ED957',
    marginBottom: 16
  },
  btnCancelar: {
    backgroundColor: '#1F2B5B'
  },
  saveText: {
    color: '#fff',
    fontSize: 16,
    letterSpacing: 1,
    fontWeight: "700"
  }
});

export default CadastroSinais;