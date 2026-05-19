// Detalle de tarea seleccionada

import { Text, View ,StyleSheet } from "react-native"




const DetalleTareaScreen = () => {
    return(
        <View style={styles.container}>
            <Text style={styles.titulo}>Detalle de Tarea</Text>
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
},
});

export default DetalleTareaScreen;