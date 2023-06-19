import { useState } from "react";
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import moment from "moment/moment";

import { auth } from '../config/firebase';
import { getFirestore, collection, addDoc } from "firebase/firestore";

const db = getFirestore(auth);

const CadastroSinais = () => {
  const [pressao, setPressao] = useState('');
  const [glicose, setGlicose] = useState('');
  const [temperatura, setTemperatura] = useState('');
  const [batimento, setBatimento] = useState('');

  const navigation = useNavigation();
  
  async function cadastrarSinaisVitais() {
    const collec = collection(db, "/Sinais-Vitais");
    await addDoc(collec, {
      pressao: pressao,
      glicose: glicose,
      temperatura: temperatura,
      batimento: batimento,
      dataCadastro: moment().utcOffset("-03:00").format("DD/MM/YYYY HH:mm:ss"),
      idUsuario: "1q2w3e"
    })
    .then(() => {
      console.log("Registrado");
      navigation.navigate('Detalhes Sinais Vitais');
    })
    .catch((error) => {
      console.log("Não registrou " + error);
    });
  }

  function cancelarCadastro() {
    navigation.goBack();
  }

  return (
    <SafeAreaView style={[styles.container, styles.shadowProp]}>
      <View style={styles.signalsContainer}>
        <Text style={styles.label}>Pressão (mmHg)</Text>
        <TextInput
          style={styles.input}
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
          style={styles.input}
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
          style={styles.input}
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
          style={styles.input}
          placeholder="110"
          placeholderTextColor="#ccc"
          value={batimento}
          onChangeText={batimento => setBatimento(batimento)}
          keyboardType="numeric"
        />
      </View>

      <TouchableOpacity style={[styles.btn, styles.btnSalvar]} onPress={() => cadastrarSinaisVitais()}>
        <Text style={styles.saveText}>Salvar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.btn, styles.btnCancelar]} onPress={() => cancelarCadastro()}>
        <Text style={styles.saveText}>Cancelar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 16,
    paddingTop: 40,
    backgroundColor: '#fff'
  },
  signalsContainer: {
    padding: 16,
    width: '100%',
    alignItems: "baseline",
    backgroundColor: '#fafafa',
    borderRadius: 8,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#222'
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
    height: 35,
    width: '100%'
  },
  btn: {
    position: "absolute",
    padding: 16,
    width: '100%',
    borderRadius: 8,
    alignItems: "center"
  },
  btnSalvar: {
    bottom: 80,
    backgroundColor: '#7ED957'
  },
  btnCancelar:{
    bottom: 16,
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