import React, { useEffect, useState } from 'react'
import { FlatList, TouchableOpacity } from 'react-native'
import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { auth } from "../config/firebase";
import { collection, getDocs, getFirestore, orderBy, query, where } from "firebase/firestore";

const db = getFirestore(auth);

const Principal = () => {
  const navigation = useNavigation();
  const collec = collection(db, "/Sinais-Vitais");
  const [sinais, setSinais] = useState([]);

  useEffect(() => {
    navigation.addListener("focus", async () => {
      const q = query(collec, where("idUsuario", "==", "1q2w3e"), orderBy("dataCadastro", "desc"));
      const docs = await getDocs(q);
      const documents = [];

      docs.forEach((doc) => {
        documents.push({
          ...doc.data(),
          id: doc.id
        });
      });

      setSinais(documents);
    }
    )
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View styles={styles.container}>
        <FlatList
          data={sinais}
          renderItem={({ item }) => (
            <View style={[styles.signalsContainer, styles.width100]}>
              <View>
                <View style={[styles.signal, styles.width100]}>
                  <Text style={styles.label}>Pressão (mmHg):</Text>
                  <Text style={styles.value}>{item.pressao}</Text>
                </View>

                <View style={[styles.signal, styles.width100]}>
                  <Text style={styles.label}>Glicose (mg/dL):</Text>
                  <Text style={styles.value}>{item.glicose}</Text>
                </View>

                <View style={[styles.signal, styles.width100]}>
                  <Text style={styles.label}>Temperatura (°C):</Text>
                  <Text style={styles.value}>{item.temperatura}</Text>
                </View>

                <View style={[styles.signal, styles.width100]}>
                  <Text style={styles.label}>Batimento (bpm):</Text>
                  <Text style={styles.value}>{item.batimento}</Text>
                </View>

                <View style={[styles.signal, styles.width100]}>
                  <Text style={styles.label}>Cadastrado em:</Text>
                  <Text style={styles.value}>{item.dataCadastro}</Text>
                </View>
              </View>

              <TouchableOpacity
                style={[styles.button, styles.detButton]}
                onPress={() => navigation.navigate('Detalhes Sinais Vitais', { idSinais: item.id })}
              >
                <Ionicons name="document-text-outline" size={40} color="#1F2B5B" />
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={item => item.id}
        />
      </View>
      <TouchableOpacity
        style={[styles.button, styles.addButton]}
        onPress={() => navigation.navigate('Cadastro Sinais Vitais')}
      >
        <Ionicons name="add-outline" size={40} color="#7ED957" />
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default Principal

const styles = StyleSheet.create({
  width100: {
    width: "100%"
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center'
  },
  signalsContainer: {
    padding: 16,
    backgroundColor: '#fafafa',
    borderRadius: 8,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#222',
    flexDirection: "row",
    alignItems: 'center'
  },
  signal: {
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
  button: {
    padding: 14,
    borderRadius: 100,
    position: 'absolute',
    right: 24,
  },
  detButton: {
    backgroundColor: '#7ED957',
    marginVertical: 'auto'
  },
  addButton: {
    backgroundColor: '#1F2B5B',
    bottom: 24,
  },
})