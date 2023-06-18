import { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { auth } from "../config/firebase";
import { doc, getDoc, getFirestore } from "firebase/firestore";

const db = getFirestore(auth);

const DetalhesSinais = ({navigation, route}) => {
    const [pressao, setPressao] = useState('');
    const [glicose, setGlicose] = useState('');
    const [temperatura, setTemperatura] = useState('');
    const [batimento, setBatimento] = useState('');
    const [dataCadastro, setDataCadastro] = useState('');

    useEffect(() => {
        async function buscarDados(){
            const document = doc(db, "/Sinais-Vitais", route.params.idSinais);
            await getDoc(document)
                .then((dados) => {
                    if (dados.exists()){
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

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.signalsContainer}>
                <Text style={styles.label}>Pressão (mmHg):</Text>
                <Text style={styles.value}>{pressao}</Text>
            </View>

            <View style={styles.signalsContainer}>
                <Text style={styles.label}>Glicose (mg/dL):</Text>
                <Text style={styles.value}>{glicose}</Text>
            </View>

            <View style={styles.signalsContainer}>
                <Text style={styles.label}>Temperatura (°C):</Text>
                <Text style={styles.value}>{temperatura}</Text>
            </View>

            <View style={styles.signalsContainer}>
                <Text style={styles.label}>Batimento (bpm):</Text>
                <Text style={styles.value}>{batimento}</Text>
            </View>

            <View style={styles.signalsContainer}>
                <Text style={styles.label}>Cadastrado em:</Text>
                <Text style={styles.value}>{dataCadastro}</Text>
            </View>

            <TouchableOpacity style={[styles.btn, styles.btnEditar]} onPress={() => {navigation.navigate('Editar Sinais Vitais')}}>
                <Text style={styles.btnText}>Editar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.btn, styles.btnRetornar]} onPress={() => {navigation.navigate('Principal')}}>
                <Text style={styles.btnText}>Retornar</Text>
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
        position: "absolute",
        padding: 16,
        width: '100%',
        borderRadius: 8,
        alignItems: "center"
    },
    btnEditar: {
        bottom: 80,
        backgroundColor: '#7ED957'
    },
    btnRetornar:{
        bottom: 16,
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