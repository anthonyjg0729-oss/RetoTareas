// DetalleTareaScreen.tsx
// Pantalla de detalle que muestra toda la información de una tarea.
// Consume datos reales del backend por ID.

import React, { useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import {ParametrosTarea} from '../../../shared/navigation/AppNavegador';
import {Tarea, obtenerTareaPorId} from '../services/tareaService';

type DetalleTareaRouteProp = RouteProp<ParametrosTarea, 'DetalleTarea'>;

const PRIORIDAD_COLORES: Record<string, {bg: string; text: string}> = {
  Alta:  {bg: '#FFEBE8', text: '#C0392B'},
  Media: {bg: '#FFF3CD', text: '#856404'},
  Baja:  {bg: '#E8F5E9', text: '#2E7D32'},
};

const ESTADO_COLORES: Record<string, {bg: string; text: string}> = {
  Pendiente:     {bg: '#EEF2FF', text: '#3730A3'},
  'En Progreso': {bg: '#FFF8E1', text: '#F57F17'},
  Completada:    {bg: '#E8F5E9', text: '#2E7D32'},
};

const DetalleTareaScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<DetalleTareaRouteProp>();
  const {TareaID} = route.params;

  const [tarea, setTarea] = useState<Tarea | null>(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

// 1. El useEffect escucha a 'cargarDetalle'
useEffect(() => {
    const cargarDetalle = async () => {
      try {
        setCargando(true);
        setError(null);
        const data = await obtenerTareaPorId(TareaID);
        setTarea(data);
      } catch {
        setError('Error al cargar el detalle de la tarea');
      } finally {
        setCargando(false);
      }
    };

    cargarDetalle();
  }, [TareaID]); // <-- IMPORTANTE: Ponemos aquí la dependencia

  if (cargando) {
    return (
      <SafeAreaView style={styles.safe}>
        <ActivityIndicator size="large" color="#1C1C1E" style={{marginTop: 40}} />
      </SafeAreaView>
    );
  }

  if (error || !tarea) {
    return (
      <SafeAreaView style={styles.safe}>
        <Text style={styles.errorText}>{error || 'Tarea no encontrada'}</Text>
      </SafeAreaView>
    );
  }

  const prioridad = PRIORIDAD_COLORES[tarea.prioridad];
  const estado = ESTADO_COLORES[tarea.estado];

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backBtn}>← Volver</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Detalle</Text>
      </View>

      <ScrollView style={styles.body}>
        <View style={styles.card}>

          {/* Título */}
          <Text style={styles.titulo}>{tarea.titulo}</Text>

          {/* Badges */}
          <View style={styles.badgeRow}>
            <View style={[styles.badge, {backgroundColor: prioridad?.bg}]}>
              <Text style={[styles.badgeText, {color: prioridad?.text}]}>{tarea.prioridad}</Text>
            </View>
            <View style={[styles.badge, {backgroundColor: estado?.bg}]}>
              <Text style={[styles.badgeText, {color: estado?.text}]}>{tarea.estado}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          {/* Descripción */}
          <Text style={styles.label}>Descripción</Text>
          <Text style={styles.value}>{tarea.descripcion}</Text>

          <View style={styles.divider} />

          {/* Prioridad y Estado */}
          <View style={styles.row}>
            <View style={styles.col}>
              <Text style={styles.label}>Prioridad</Text>
              <Text style={styles.value}>{tarea.prioridad}</Text>
            </View>
            <View style={styles.col}>
              <Text style={styles.label}>Estado</Text>
              <Text style={styles.value}>{tarea.estado}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          {/* Fechas */}
          <View style={styles.row}>
            <View style={styles.col}>
              <Text style={styles.label}>Creada</Text>
              <Text style={styles.value}>{new Date(tarea.creadoEn).toLocaleDateString('es-PE')}</Text>
            </View>
            <View style={styles.col}>
              <Text style={styles.label}>Actualizada</Text>
              <Text style={styles.value}>{new Date(tarea.actualizadoEn).toLocaleDateString('es-PE')}</Text>
            </View>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {flex: 1, backgroundColor: '#F2F2F7'},
  header: {backgroundColor: '#fff', padding: 16, paddingBottom: 12, borderBottomWidth: 0.5, borderBottomColor: '#F0F0F0'},
  backBtn: {fontSize: 14, color: '#1C1C1E', marginBottom: 6},
  headerTitle: {fontSize: 24, fontWeight: '700', color: '#1C1C1E'},
  body: {padding: 12},
  card: {backgroundColor: '#fff', borderRadius: 14, padding: 16, shadowColor: '#000', shadowOffset: {width: 0, height: 2}, shadowOpacity: 0.06, shadowRadius: 8, elevation: 2},
  titulo: {fontSize: 18, fontWeight: '700', color: '#1C1C1E', marginBottom: 10, lineHeight: 24},
  badgeRow: {flexDirection: 'row', gap: 6, marginBottom: 8},
  badge: {paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10},
  badgeText: {fontSize: 12, fontWeight: '600'},
  divider: {height: 0.5, backgroundColor: '#F0F0F0', marginVertical: 12},
  label: {fontSize: 10, color: '#8E8E93', textTransform: 'uppercase', letterSpacing: 0.5, fontWeight: '600', marginBottom: 4},
  value: {fontSize: 14, color: '#1C1C1E', lineHeight: 20},
  row: {flexDirection: 'row', gap: 12},
  col: {flex: 1},
  errorText: {fontSize: 16, color: '#C0392B', textAlign: 'center', marginTop: 20, padding: 16},
});

export default DetalleTareaScreen;