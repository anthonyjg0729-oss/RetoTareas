// FiltroTareaScreen.tsx
// Pantalla de filtrado de tareas por estado y prioridad.
// Consume datos reales del backend mediante el hook useFiltrarTareas.

import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ParametrosTarea} from '../../../shared/navigation/AppNavegador';
import {useFiltrarTareas} from '../hooks/useTarea';

type NavigationProp = NativeStackNavigationProp<ParametrosTarea>;

const ESTADOS = ['Todos', 'Pendiente', 'En Progreso', 'Completada'];
const PRIORIDADES = ['Todas', 'Alta', 'Media', 'Baja'];

const PRIORIDAD_COLORES: Record<string, {bg: string; text: string; dot: string}> = {
  Alta:  {bg: '#FFEBE8', text: '#C0392B', dot: '#E74C3C'},
  Media: {bg: '#FFF3CD', text: '#856404', dot: '#F39C12'},
  Baja:  {bg: '#E8F5E9', text: '#2E7D32', dot: '#27AE60'},
};

const ESTADO_COLORES: Record<string, {bg: string; text: string}> = {
  Pendiente:     {bg: '#EEF2FF', text: '#3730A3'},
  'En Progreso': {bg: '#FFF8E1', text: '#F57F17'},
  Completada:    {bg: '#E8F5E9', text: '#2E7D32'},
};

const FiltroTareaScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [estadoSeleccionado, setEstadoSeleccionado] = useState('Todos');
  const [prioridadSeleccionada, setPrioridadSeleccionada] = useState('Todas');

  // Consume el backend con los filtros seleccionados
  const {tareas, cargando, error} = useFiltrarTareas(estadoSeleccionado, prioridadSeleccionada);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backBtn}>← Volver</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Filtrar tareas</Text>
      </View>

      <View style={styles.body}>
        {/* Filtro por estado */}
        <Text style={styles.sectionTitle}>Por estado</Text>
        <View style={styles.chipRow}>
          {ESTADOS.map(estado => (
            <TouchableOpacity
              key={estado}
              style={[styles.chip, estadoSeleccionado === estado && styles.chipActive]}
              onPress={() => setEstadoSeleccionado(estado)}>
              <Text style={[styles.chipText, estadoSeleccionado === estado && styles.chipTextActive]}>
                {estado}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Filtro por prioridad */}
        <Text style={styles.sectionTitle}>Por prioridad</Text>
        <View style={styles.chipRow}>
          {PRIORIDADES.map(prioridad => (
            <TouchableOpacity
              key={prioridad}
              style={[styles.chip, prioridadSeleccionada === prioridad && styles.chipActive]}
              onPress={() => setPrioridadSeleccionada(prioridad)}>
              <Text style={[styles.chipText, prioridadSeleccionada === prioridad && styles.chipTextActive]}>
                {prioridad}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.divider} />

        {/* Resultados */}
        {cargando ? (
          <ActivityIndicator size="large" color="#1C1C1E" style={{marginTop: 20}} />
        ) : error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : (
          <>
            <Text style={styles.resultCount}>{tareas.length} resultados</Text>
            <FlatList
              data={tareas}
              keyExtractor={item => item.id.toString()}
              renderItem={({item}) => {
                const prioridad = PRIORIDAD_COLORES[item.prioridad];
                const estado = ESTADO_COLORES[item.estado];
                return (
                  <TouchableOpacity
                    style={styles.card}
                    onPress={() => navigation.navigate('DetalleTarea', {TareaID: item.id})}>
                    <View style={styles.cardTop}>
                      <Text style={styles.cardTitle}>{item.titulo}</Text>
                      <View style={[styles.dot, {backgroundColor: prioridad?.dot}]} />
                    </View>
                    <Text style={styles.cardDesc}>{item.descripcion}</Text>
                    <View style={styles.cardFooter}>
                      <View style={[styles.badge, {backgroundColor: prioridad?.bg}]}>
                        <Text style={[styles.badgeText, {color: prioridad?.text}]}>{item.prioridad}</Text>
                      </View>
                      <View style={[styles.badge, {backgroundColor: estado?.bg}]}>
                        <Text style={[styles.badgeText, {color: estado?.text}]}>{item.estado}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {flex: 1, backgroundColor: '#F2F2F7'},
  header: {backgroundColor: '#fff', padding: 16, paddingBottom: 12, borderBottomWidth: 0.5, borderBottomColor: '#F0F0F0'},
  backBtn: {fontSize: 14, color: '#1C1C1E', marginBottom: 6},
  headerTitle: {fontSize: 24, fontWeight: '700', color: '#1C1C1E'},
  body: {padding: 12, flex: 1},
  sectionTitle: {fontSize: 13, fontWeight: '600', color: '#1C1C1E', marginBottom: 8, marginTop: 4},
  chipRow: {flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 14},
  chip: {paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, backgroundColor: '#fff', borderWidth: 0.5, borderColor: '#E5E5EA'},
  chipActive: {backgroundColor: '#1C1C1E', borderColor: '#1C1C1E'},
  chipText: {fontSize: 12, color: '#8E8E93', fontWeight: '500'},
  chipTextActive: {color: '#fff'},
  divider: {height: 0.5, backgroundColor: '#E5E5EA', marginBottom: 10},
  resultCount: {fontSize: 12, fontWeight: '600', color: '#1C1C1E', marginBottom: 10},
  card: {backgroundColor: '#fff', borderRadius: 14, padding: 14, marginBottom: 10, shadowColor: '#000', shadowOffset: {width: 0, height: 2}, shadowOpacity: 0.06, shadowRadius: 8, elevation: 2},
  cardTop: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4},
  cardTitle: {fontSize: 14, fontWeight: '600', color: '#1C1C1E', flex: 1},
  dot: {width: 8, height: 8, borderRadius: 4, marginLeft: 8, marginTop: 4},
  cardDesc: {fontSize: 12, color: '#8E8E93', marginBottom: 8},
  cardFooter: {flexDirection: 'row', gap: 6},
  badge: {paddingHorizontal: 8, paddingVertical: 3, borderRadius: 10},
  badgeText: {fontSize: 11, fontWeight: '600'},
  errorText: {fontSize: 14, color: '#C0392B', textAlign: 'center', marginTop: 20},
});

export default FiltroTareaScreen;