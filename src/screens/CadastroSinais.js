import { useState } from "react";
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

const CadastroSinais = () => {
    const [pressao, setPressao] = useState('');
    const [glicose, setGlicose] = useState('');
    const [temperatura, setTemperatura] = useState('');
    const [batimento, setBatimento] = useState('');

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
                  />
            </View>
            
            <TouchableOpacity style={styles.btnSalvar} onPress={() => {}}>
                <Text style={styles.saveText}>Salvar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnCancelar} onPress={() => {}}>
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
  btnSalvar: {
    position: "absolute",
    bottom: 16,
    padding: 16,
    width: '100%',
    borderRadius: 8,
    backgroundColor: '#1F2B5B',
    alignItems: "center",
  },
  saveText: {
    color: '#fff',
    fontSize: 16,
    letterSpacing: 1,
    fontWeight: "700"
  }
});

export default CadastroSinais;