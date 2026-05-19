// PANTALLA PRINCIPAL QUE MUESTAR LA LISTA DE TAREAS

import React from "react";
import { View , Text , StyleSheet } from "react-native";

const ListaTareaScreen = () => {
return (
    <View style={styles.container}>
        <Text style={styles.titulo}>Lista de Tareas</Text>
    </View>
)
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F2F7',
       
    },
    titulo: {
        fontSize: 24,
        fontWeight: '700',
        color:'#1C1C1E',
        padding:16,
    },
});

export default ListaTareaScreen;