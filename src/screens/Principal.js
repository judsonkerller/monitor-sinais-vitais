import React from 'react'
import { TouchableOpacity } from 'react-native'
import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import { Ionicons } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';

const Principal = () => {
  const navigation = useNavigation();

    return (
      <SafeAreaView style={styles.container}>

      <View styles={styles.container}>
        <Text>Principal</Text>

      </View>
      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('Cadastro Sinais Vitais')}>
      <Ionicons name="add-outline" size={40} color="#1F2B5B" />
      </TouchableOpacity>
      </SafeAreaView>
    )
}

export default Principal

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center'
  },
  addButton: {
    backgroundColor: '#7ED957',
    padding: 14,
    borderRadius: 100,
    position: 'absolute',
    bottom: 24,
    right: 24,

  },
})