import { useState } from "react";
import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

const CadastroSinais = () => {
    const [pressao, setPressao] = useState('');
    const [glicose, setGlicose] = useState('');
    const [temperatura, setTemperatura] = useState('');
    const [batimento, setBatimento] = useState('');

    return (
        <SafeAreaView>
            <View>
                <Text style={styles.label}>Pressão (mmHg)</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Pressão"
                    value={pressao}
                    onChangeText={pressao => setPressao(pressao)}
                />

                <Text style={styles.label}>Glicose (mg/dL)</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Glicose"
                    value={glicose}
                    onChangeText={glicose => setGlicose(glicose)}
                />

                <Text style={styles.label}>Temperatura (°C)</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Temperatura"
                    value={temperatura}
                    onChangeText={temperatura => setTemperatura(temperatura)}
                />

                <Text style={styles.label}>Batimento (bpm)</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Batimento"
                    value={batimento}
                    onChangeText={batimento => setBatimento(batimento)}
                />
            </View>
            <TouchableOpacity style={styles.btnSalvar} onPress={() => {}}>
                <Text>Salvar</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    input: {

    },
    label: {
        
    },
    btnSalvar: {

    }
});

export default CadastroSinais;