import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';



const HomeScreen = () => {

  const ButtonClickGrid = ({ text, link, cl }: { text: string, link: string, cl: string }) => {
    // Use type assertion to tell TypeScript this is the correct type
    const navigation = useNavigation<any>();
    
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate(link)}
        style={[styles.gridButton, { backgroundColor: cl }]}
      >
        <Text style={styles.gridButtonText}>{text}</Text>
      </TouchableOpacity>
    );
  };



  const colors = {
    emergency: '#FF0000', // Red
    certificate: '#4CAF50', // Green
    safety: '#2196F3',    // Blue
    reports: '#FF9800'    // Orange
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>GHANA NATIONAL FIRE SERVICE</Text>

      <TextInput
        style={styles.searchInput}
        placeholder="Search nearby stations...."
      />

      {/* 2x2 Grid for Buttons */}
      <View style={styles.gridContainer}>


        <ButtonClickGrid text='Emergency contacts' link='emergency'  cl= {colors.emergency}/>
        <ButtonClickGrid text='Certificate Apply Now' link='certificate' cl= {colors.certificate} />
        <ButtonClickGrid text='Safety Guidelines' link='safety'  cl= {colors.safety} />
        <ButtonClickGrid text='Reports History' link='reports'   cl= {colors.reports}/>


      </View>

      {/* Nearby Fire Stations Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Nearby Fire Stations</Text>
        <TouchableOpacity style={styles.linkButton}>
          <Text style={styles.linkText}>View All</Text>
        </TouchableOpacity>

        <View style={styles.stationItem}>
          <Text style={styles.stationName}>Accra Central Fire Station 1.2km</Text>
          <Text style={styles.stationStatus}>Available</Text>
        </View>

        <View style={styles.stationItem}>
          <Text style={styles.stationName}>Tema Fire Station 3.5km</Text>
          <Text style={styles.stationStatus}>Busy</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  searchInput: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  gridButton: {
    width: '48%', // Slightly less than 50% to account for spacing
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 10,
  },
  gridButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  emergencyButton: {
    backgroundColor: '#FF7F7F', // Light Red
  },
  certificateButton: {
    backgroundColor: '#ADD8E6', // Light Blue
  },
  safetyButton: {
    backgroundColor: '#FFD700', // Light Amber
  },
  reportsButton: {
    backgroundColor: '#DDA0DD', // Light Purple
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  linkButton: {
    width: '100%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  linkText: {
    color: 'blue',
    fontSize: 16,
  },
  stationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  stationName: {
    fontSize: 16,
  },
  stationStatus: {
    fontSize: 16,
    color: 'green',
  },
});

export default HomeScreen;