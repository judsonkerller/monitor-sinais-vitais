import { useEffect, useState } from "react";
import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { auth } from "../config/firebase";
import { deleteDoc, doc, getDoc, getFirestore } from "firebase/firestore";

const db = getFirestore(auth);

const DetalhesSinais = ({ navigation, route }) => {
    const [pressao, setPressao] = useState('');
    const [glicose, setGlicose] = useState('');
    const [temperatura, setTemperatura] = useState('');
    const [batimento, setBatimento] = useState('');
    const [dataCadastro, setDataCadastro] = useState('');
    const [idSinais, setIdSinais] = useState(route.params.idSinais);

    const document = doc(db, "/Sinais-Vitais", idSinais);

    useEffect(() => {
        navigation.addListener("focus", () =>
            getDoc(document)
                .then((dados) => {
                    if (dados.exists()) {
                        setPressao(dados.data().pressao);
                        setGlicose(dados.data().glicose);
                        setTemperatura(dados.data().temperatura);
                        setBatimento(dados.data().batimento);
                        setDataCadastro(dados.data().dataCadastro);
                        console.log("Documento buscado");
                    } else {
                        console.log("Documento não encontrado");
                    }
                })
                .catch((error) => {
                    console.log("Erro ao buscar documento " + error);
                })
        )
    }, [navigation]);

    function alertaExclusao() {
        Alert.alert('Excluir Sinais Vitais', 'Confirma a exclusão dos sinais vitais?', [
            {
                text: 'Cancelar',
                onPress: () => console.log('Cancelada tentativa de exclusão'),
                style: 'cancel',
            },
            {
                text: 'Confirmar',
                onPress: () => excluirSinaisVitais()
            },
        ]);
    }

    async function excluirSinaisVitais() {
        await deleteDoc(document)
            .then(() => {
                console.log("Documento excluido");
                navigation.navigate('Principal')
            })
            .catch((error) => {
                console.log("Sem exclusão " + error);
            });
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={[styles.containerScroll, styles.width100]}>
                <View style={[styles.signalsContainer, styles.width100]}>
                    <Text style={styles.label}>Pressão (mmHg):</Text>
                    <Text style={styles.value}>{pressao}</Text>
                </View>

                <View style={[styles.signalsContainer, styles.width100]}>
                    <Text style={styles.label}>Glicose (mg/dL):</Text>
                    <Text style={styles.value}>{glicose}</Text>
                </View>

                <View style={[styles.signalsContainer, styles.width100]}>
                    <Text style={styles.label}>Temperatura (°C):</Text>
                    <Text style={styles.value}>{temperatura}</Text>
                </View>

                <View style={[styles.signalsContainer, styles.width100]}>
                    <Text style={styles.label}>Batimento (bpm):</Text>
                    <Text style={styles.value}>{batimento}</Text>
                </View>

                <View style={[styles.signalsContainer, styles.width100]}>
                    <Text style={styles.label}>Cadastrado em:</Text>
                    <Text style={styles.value}>{dataCadastro}</Text>
                </View>
            </ScrollView>

            <View style={styles.width100}>
                <TouchableOpacity
                    style={[styles.btn, styles.btnEditar, styles.width100]}
                    onPress={() => { navigation.navigate('Editar Sinais Vitais', { idSinais: idSinais }) }}
                >
                    <Text style={styles.btnText}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.btn, styles.btnExcluir, styles.width100]}
                    onPress={() => { alertaExclusao() }}
                >
                    <Text style={styles.btnText}>Excluir</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.btn, styles.btnRetornar, styles.width100]}
                    onPress={() => { navigation.navigate('Principal') }}
                >
                    <Text style={styles.btnText}>Retornar</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    width100: {
        width: "100%"
    },
    container: {
        flex: 1,
        alignItems: "center",
        padding: 16,
        paddingTop: 40,
        backgroundColor: '#fff'
    },
    containerScroll: {
        marginBottom: 16
    },
    signalsContainer: {
        padding: 16,
        backgroundColor: '#fafafa',
        borderRadius: 8,
        marginBottom: 16,
        elevation: 2,
        shadowColor: '#222',
        flexDirection: "row"
    },
    label: {
        color: '#000',
        fontWeight: "700",
        width: '30%',
        textAlign: 'right'
    },
    value: {
        marginLeft: 8,
        width: '70%'
    },
    btn: {
        padding: 16,
        borderRadius: 8,
        alignItems: "center"
    },
    btnEditar: {
        backgroundColor: '#7ED957',
        marginBottom: 16
    },
    btnExcluir: {
        backgroundColor: '#FF3333',
        marginBottom: 16
    },
    btnRetornar: {
        backgroundColor: '#1F2B5B'
    },
    btnText: {
        color: '#fff',
        fontSize: 16,
        letterSpacing: 1,
        fontWeight: "700"
    }
});

export default DetalhesSinais;