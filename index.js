// index.js
// Punto de entrada de la app. Aquí registramos el componente principal.

import {AppRegistry} from 'react-native';
import React from 'react';
import AppNavegador from './src/shared/navigation/AppNavegador';
import {name as appName} from './app.json';

// Registramos AppNavegador como componente raíz de la app
AppRegistry.registerComponent(appName, () => AppNavegador);



