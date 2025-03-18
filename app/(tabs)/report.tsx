import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../types'; // Import the RootStackParamList

export default function Report() {
  const [image, setImage] = useState<{ uri: string } | null>(null);
  const [description,  setDescription] = useState<string>('');
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    console.log('Report component mounted');
  }, []);

  const pickImage = async() => {
    await launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.assets && response.assets.length > 0) {
        const uri = response.assets[0].uri;
        if (uri) {
          setImage({ uri });
        } else {
          console.log('No URI found in the selected asset');
        }
      } else {
        console.log('No image selected or an error occurred');
      }
    });
  };

  const confirmLocation = () => {
    if (!image && !description) {
      Alert.alert('Error', 'Please upload a video or picture or describe the incident before proceeding.');
      return;
    }
    navigation.navigate('ConfirmLocation');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../../assets/images/logo_main.png')}
          style={styles.logo}
        />
        <Text style={styles.headerText}>Ghana National Fire Service</Text>
      </View>
      <View style={styles.titleContainer}>
        <ThemedText style={styles.title}>Report Incident</ThemedText>
      </View>

      <View style={styles.centeredContainer}>
        <ThemedView style={styles.uploadContainer}>
          <TouchableOpacity onPress={pickImage} style={styles.uploadButton}>
            <Image
              source={image ? { uri: image.uri } : require('../../assets/images/upload-icon.png')}
              style={styles.uploadImage}
            />
            <ThemedText style={styles.uploadText}>Upload Photos/Videos of Incident</ThemedText>
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder="Describe the Incident..."
            multiline
            numberOfLines={4}
            value={description}
            onChangeText={setDescription}
          />
        </ThemedView>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.confirmButton} onPress={confirmLocation}>
          <Text style={styles.confirmButtonText}>Confirm Location</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5F7',
    padding: 20,
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  headerText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#FF0000',
  },
  titleContainer: {
    backgroundColor: '#E0E0E0',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FF0000',
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  uploadContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  uploadButton: {
    alignItems: 'center',
    marginBottom: 20,
  },
  uploadImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  uploadText: {
    fontSize: 18,
    color: '#333',
  },
  input: {
    height: 100,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    width: '100%',
  },
  footer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 'auto',
  },
  confirmButton: {
    backgroundColor: '#FF0000',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
});
