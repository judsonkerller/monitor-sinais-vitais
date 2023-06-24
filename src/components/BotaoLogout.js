import React from "react";
import { TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from "@expo/vector-icons";
import { getAuth, signOut } from "@firebase/auth";
import { StyleSheet } from "react-native";

const BotaoLogout = () => {

    const navigation = useNavigation();

    function realizarLogout() {
        const autho = getAuth();
        signOut(autho)
            .then(() => {
                console.log("Saindo");
                navigation.navigate("Login");
            }).catch((error) => {
                console.log("Não foi possível realizar log out - ", error);
            });
    }

    return (
        <TouchableOpacity style={styles.button} onPress={() => realizarLogout()}>
            <Ionicons name="log-out" size={40} color="#1F2B5B" />
        </TouchableOpacity>
    )
}

export default BotaoLogout;

const styles = StyleSheet.create({
    button: {
        paddingRight: 16,
    }
})