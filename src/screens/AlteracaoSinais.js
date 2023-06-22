import { useEffect, useState } from "react";
import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

import { auth } from '../config/firebase';
import { doc, getDoc, getFirestore, updateDoc } from "firebase/firestore";

const db = getFirestore(auth);

const AlteracaoSinais = ({ navigation, route }) => {
    const [pressao, setPressao] = useState('');
    const [glicose, setGlicose] = useState('');
    const [temperatura, setTemperatura] = useState('');
    const [batimento, setBatimento] = useState('');
    const [dataCadastro, setDataCadastro] = useState('');
    const [idSinais, setIdSinais] = useState(route.params.idSinais);

    const document = doc(db, "/Sinais-Vitais", idSinais);

    useEffect(() => {
        async function buscarDados() {
            await getDoc(document)
                .then((dados) => {
                    if (dados.exists()) {
                        setPressao(dados.data().pressao);
                        setGlicose(dados.data().glicose);
                        setTemperatura(dados.data().temperatura);
                        setBatimento(dados.data().batimento);
                        setDataCadastro(dados.data().dataCadastro);
                    } else {
                        console.log("Documento não encontrado");
                    }
                })
                .catch((error) => {
                    console.log("Erro ao buscar documento " + error);
                });
        }
        buscarDados();
    }, []);

    async function alterarSinaisVitais() {
        await updateDoc(document, {
            pressao: pressao,
            glicose: glicose,
            temperatura: temperatura,
            batimento: batimento
        })
            .then(() => {
                console.log("Alterado");
                navigation.navigate('Detalhes Sinais Vitais', { idSinais: idSinais });
            })
            .catch((error) => {
                console.log("Não alterou " + error);
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

                    <View style={styles.signalsContainer}>
                        <Text style={styles.label}>Data de cadastro</Text>
                        <TextInput
                            style={[styles.input, styles.width100]}
                            value={dataCadastro}
                            editable={false}
                        />
                    </View>
                </View>
            </ScrollView>

            <View style={styles.width100}>
                <TouchableOpacity
                    style={[styles.btn, styles.btnSalvar, styles.width100]}
                    onPress={() => alterarSinaisVitais()}
                >
                    <Text style={styles.saveText}>Salvar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.btn, styles.btnCancelar, styles.width100]}
                    onPress={() => navigation.goBack()}
                >
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

export default AlteracaoSinais;