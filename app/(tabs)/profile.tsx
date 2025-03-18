import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation
import { StackNavigationProp } from '@react-navigation/stack'; // Import StackNavigationProp
import { RootStackParamList } from '../type';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons

// Define the type for the navigation prop
type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Profile'>;

const ProfileScreen = () => {
  const navigation = useNavigation<ProfileScreenNavigationProp>(); // Use useNavigation hook
  const [isAccountSettingsEnabled, setIsAccountSettingsEnabled] = useState(false);
  const [isEmergencyHistoryEnabled, setIsEmergencyHistoryEnabled] = useState(false);

  const handleSignOut = () => {
    Alert.alert(
      "Sign Out",
      "Are you sure you want to sign out?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Sign Out", onPress: () => console.log("Signed Out") }
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* Profile Header Section */}
      <View style={styles.profileHeader}>
        <Image
        source={require('../../assets/images/profile.jpg')}
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>Sarfo Silas</Text>
        <Text style={styles.profileEmail}>Sarfosilas73@gmail.com</Text>
        <Text style={styles.profileMemberSince}>Member since Jan 2025</Text>
        <Text style={styles.profileReports}>2 Reports</Text>
        <TouchableOpacity style={styles.editProfileButton}>
          <Text style={styles.editProfileButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Notifications Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notifications</Text>
        <Text style={styles.sectionSubtitle}>Manage how you receive alerts and updates</Text>

        {/* Configure Account Settings */}
        <View style={styles.notificationItem}>
          <Text style={styles.notificationLabel}>Configure Account Settings</Text>
          <Switch
            value={isAccountSettingsEnabled}
            onValueChange={(value) => setIsAccountSettingsEnabled(value)}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={isAccountSettingsEnabled ? '#007BFF' : '#f4f3f4'}
          />
        </View>

        {/* Manage Emergency History */}
        <View style={styles.notificationItem}>
          <Text style={styles.notificationLabel}>Manage Emergency History</Text>
          <Switch
            value={isEmergencyHistoryEnabled}
            onValueChange={(value) => setIsEmergencyHistoryEnabled(value)}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={isEmergencyHistoryEnabled ? '#007BFF' : '#f4f3f4'}
          />
        </View>

        {/* Emergency History List */}
        <View style={styles.emergencyHistory}>
          <Text style={styles.emergencyHistoryTitle}>Emergency History</Text>
          <View style={styles.emergencyItem}>
            <Text style={styles.emergencyItemText}>Emergency Report #2</Text>
            <Text style={styles.emergencyItemDate}>3/2/2025</Text>
            <Text style={styles.emergencyItemStatus}>(Completed)</Text>
          </View>
          <View style={styles.emergencyItem}>
            <Text style={styles.emergencyItemText}>Emergency Report #1</Text>
            <Text style={styles.emergencyItemDate}>3/1/2025</Text>
            <Text style={styles.emergencyItemStatus}>Active</Text>
          </View>
        </View>
      </View>

      {/* Suggestions Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Suggestions</Text>
        <Text style={styles.suggestionText}>
          - Keep your profile updated for better service.
        </Text>
        <Text style={styles.suggestionText}>
          - Enable notifications to stay informed.
        </Text>
        <Text style={styles.suggestionText}>
          - Review your emergency history regularly.
        </Text>
      </View>

      {/* Sign Out Button */}
      <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
        <Ionicons name="log-out-outline" size={20} color="#fff" />
        <Text style={styles.signOutButtonText}>Sign Out</Text>
      </TouchableOpacity>

      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()} // Use navigation prop
      >
        <Ionicons name="arrow-back-outline" size={20} color="#fff" />
        <Text style={styles.backButtonText}>Go Back</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
    backgroundColor: '#007BFF',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
    borderWidth: 3,
    borderColor: '#fff',
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  profileEmail: {
    fontSize: 16,
    color: '#fff',
    marginTop: 5,
  },
  profileMemberSince: {
    fontSize: 14,
    color: '#fff',
    marginTop: 5,
  },
  profileReports: {
    fontSize: 14,
    color: '#fff',
    marginTop: 5,
  },
  editProfileButton: {
    marginTop: 15,
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  editProfileButtonText: {
    color: '#007BFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  section: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 20,
    marginHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#777',
    marginBottom: 15,
  },
  notificationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  notificationLabel: {
    fontSize: 16,
    color: '#555',
  },
  emergencyHistory: {
    marginTop: 10,
  },
  emergencyHistoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  emergencyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  emergencyItemText: {
    fontSize: 16,
    color: '#555',
  },
  emergencyItemDate: {
    fontSize: 14,
    color: '#777',
  },
  emergencyItemStatus: {
    fontSize: 14,
    color: '#007BFF',
    fontWeight: 'bold',
  },
  suggestionText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
  },
  signOutButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#dc3545',
    paddingVertical: 15,
    borderRadius: 8,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  signOutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  backButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6c757d',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 20,
    marginHorizontal: 20,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default ProfileScreen;