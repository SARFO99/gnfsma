import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';
import Map from './Map';

export default function ConfirmLocation() {
  const navigation = useNavigation();
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    })();
  }, []);

  const useCurrentLocation = async () => {
    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
    setRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>New Report</Text>
      </View>
      <Text style={styles.title}>Confirm location</Text>
      <Text style={styles.subtitle}>Drag the pin or search to set the exact emergency location</Text>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search your location"
        />
        <TouchableOpacity style={styles.searchButton}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.currentLocationButton} onPress={useCurrentLocation}>
        <Text style={styles.currentLocationButtonText}>Use my current location</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.confirmButton}>
        <Text style={styles.confirmButtonText}>Confirm Location & Submit Report</Text>
      </TouchableOpacity>
      <View style={styles.mapContainer}>
        <Map
          style={styles.map}
          region={region}
          onRegionChangeComplete={setRegion}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    fontSize: 18,
    color: '#007BFF',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  searchButton: {
    backgroundColor: '#ccc',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  searchButtonText: {
    fontSize: 16,
  },
  currentLocationButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 20,
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  currentLocationButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  confirmButton: {
    backgroundColor: '#FF0000',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginBottom: 20,
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  mapContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 20,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});