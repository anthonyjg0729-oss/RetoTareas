// axiosConfig.ts
// Configuración base de Axios para conectar con el backend.
// Todas las peticiones HTTP pasan por aquí.

import axios from 'axios';

// IP del backend - usamos 10.0.2.2 porque es la IP del host desde el emulador Android
const BASE_URL = 'http://10.0.2.2:5041/api';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;