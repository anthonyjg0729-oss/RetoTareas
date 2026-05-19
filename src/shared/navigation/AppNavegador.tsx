// DEFINE LA NAVEGACION PRINCIPAL DEL APP
// AQUI SE REGISTRA TODAS LAS PANTALLAS Y EL ORDEN.
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// pantallas de nabegacion
import ListaTareaScreen from '../../features/tasks/screens/ListaTareaScreen';
import FiltrarTarea from '../../features/tasks/screens/FiltroTareaScreen';
import DetalleTareaScreen from '../../features/tasks/screens/DetalleTareaScreen';


//RECIBE UN ID PARA MOSTRAR LA TAREA
export type ParametrosTarea = {
  ListaTarea: undefined;
  filtrarTarea: undefined;
  DetalleTarea: {TareaID: number};
};


// CREAMOS EL STACK NAVEGADOR PARA LOS TIPOS DEFINIDOS DE "ParametrosTarea"
const Stack = createNativeStackNavigator<ParametrosTarea>();

const AppNavigator = () => {
  return (
    // CONTENEDOR PRINCIPAL 
    <NavigationContainer> 
      <Stack.Navigator
        initialRouteName="ListaTarea" // PARALLA INICIAL 
        screenOptions={{
          headerShown: false, // OCULATAMOS EL HEADER YA QUE CADA PANTALLA TIENE EL SUYO
        }}>
        <Stack.Screen name="ListaTarea" component={ListaTareaScreen} />
        <Stack.Screen name="filtrarTarea" component={FiltrarTarea} />
        <Stack.Screen name="DetalleTarea" component={DetalleTareaScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;