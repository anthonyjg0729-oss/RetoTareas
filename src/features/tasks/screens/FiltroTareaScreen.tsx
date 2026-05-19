// filtrar tareas por estado o prioridad

import React from 'react';
import { Text, View , StyleSheet } from 'react-native';

const FiltrarTarea= () =>{  
        return (
            <View style={styles.container}>
                <Text style={styles.titulo}>Filtrar Tareas</Text>
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
        color: '#1C1C1E',
        padding: 16,
    },
});

export default FiltrarTarea;