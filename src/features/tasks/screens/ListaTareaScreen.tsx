// ListaTareaScreen.tsx
// Pantalla principal que muestra la lista de todas las tareas.
// Ahora consume datos reales del backend mediante el hook useTareas.

import React from 'react';
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
import {useTareas} from '../hooks/useTarea';

type NavigationProp = NativeStackNavigationProp<ParametrosTarea>;

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

const ListaTareaScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const {tareas, cargando, error} = useTareas();

  // Muestra spinner mientras carga
  if (cargando) {
    return (
      <SafeAreaView style={styles.safe}>
        <ActivityIndicator size="large" color="#1C1C1E" style={{marginTop: 40}} />
      </SafeAreaView>
    );
  }

  // Muestra error si falla la conexión
  if (error) {
    return (
      <SafeAreaView style={styles.safe}>
        <Text style={styles.errorText}>{error}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerSub}>Mis Tareas</Text>
        <View style={styles.headerRow}>
          <Text style={styles.headerTitle}>Lista de tareas</Text>
          <TouchableOpacity
            style={styles.filterBtn}
            onPress={() => navigation.navigate('filtrarTarea')}>
            <Text style={styles.filterBtnText}>Filtrar</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.headerCount}>{tareas.length} tareas activas</Text>
      </View>

      {/* Lista de tareas */}
      <FlatList
        data={tareas}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.list}
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {flex: 1, backgroundColor: '#F2F2F7'},
  header: {backgroundColor: '#fff', padding: 16, paddingBottom: 12, borderBottomWidth: 0.5, borderBottomColor: '#F0F0F0'},
  headerSub: {fontSize: 12, color: '#8E8E93', marginBottom: 2},
  headerRow: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'},
  headerTitle: {fontSize: 24, fontWeight: '700', color: '#1C1C1E'},
  headerCount: {fontSize: 12, color: '#8E8E93', marginTop: 2},
  filterBtn: {backgroundColor: '#1C1C1E', paddingHorizontal: 14, paddingVertical: 6, borderRadius: 20},
  filterBtnText: {color: '#fff', fontSize: 12, fontWeight: '600'},
  list: {padding: 12},
  card: {backgroundColor: '#fff', borderRadius: 14, padding: 14, marginBottom: 10, shadowColor: '#000', shadowOffset: {width: 0, height: 2}, shadowOpacity: 0.06, shadowRadius: 8, elevation: 2},
  cardTop: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4},
  cardTitle: {fontSize: 14, fontWeight: '600', color: '#1C1C1E', flex: 1},
  dot: {width: 8, height: 8, borderRadius: 4, marginLeft: 8, marginTop: 4},
  cardDesc: {fontSize: 12, color: '#8E8E93', marginBottom: 8},
  cardFooter: {flexDirection: 'row', gap: 6},
  badge: {paddingHorizontal: 8, paddingVertical: 3, borderRadius: 10},
  badgeText: {fontSize: 11, fontWeight: '600'},
  errorText: {fontSize: 14, color: '#C0392B', textAlign: 'center', marginTop: 40, padding: 16},
});

export default ListaTareaScreen;