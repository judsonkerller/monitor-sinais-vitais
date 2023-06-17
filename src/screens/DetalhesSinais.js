import { useState } from "react";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { auth } from "../config/firebase";
import { getFirestore } from "firebase/firestore";

const db = getFirestore(auth);

const DetalhesSinais = ({navigation, route}) => {
    const [pressao, setPressao] = useState('');
    const [glicose, setGlicose] = useState('');
    const [temperatura, setTemperatura] = useState('');
    const [batimento, setBatimento] = useState('');
    const [dataCadastro, setDataCadastro] = useState('');

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.signalsContainer}>
                <Text style={styles.label}>Pressão (mmHg):</Text>
                <Text style={styles}>{pressao}</Text>
            </View>

            <View style={styles.signalsContainer}>
                <Text style={styles.label}>Glicose (mg/dL):</Text>
                <Text style={styles}>{glicose}</Text>
            </View>

            <View style={styles.signalsContainer}>
                <Text style={styles.label}>Temperatura (°C):</Text>
                <Text style={styles}>{temperatura}</Text>
            </View>

            <View style={styles.signalsContainer}>
                <Text style={styles.label}>Batimento (bpm):</Text>
                <Text style={styles}>{batimento}</Text>
            </View>

            <View style={styles.signalsContainer}>
                <Text style={styles.label}>Cadastrado em:</Text>
                <Text style={styles}>{dataCadastro}</Text>
            </View>

            <TouchableOpacity style={[styles.btn, styles.btnEditar]} onPress={() => {navigation.navigate('')}}>
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