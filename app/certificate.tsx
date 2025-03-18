import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Picker } from '@react-native-picker/picker';

type Floor = {
  type: string;
  length: string;
  width: string;
};

const CertificateApplicationScreen = () => {
  const [name, setName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [useOfPremises, setUseOfPremises] = useState<string>("");
  const [numberOfStoreys, setNumberOfStoreys] = useState<string>("");
  const [floors, setFloors] = useState<Floor[]>([]);
  const [reviewFee, setReviewFee] = useState<number>(0);
  const [finalCost, setFinalCost] = useState<number>(0);
  const [showSubmissionMessage, setShowSubmissionMessage] = useState(false);
  const [showFloorTypeModal, setShowFloorTypeModal] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  const rates = {
    groundFloor: 3,
    firstFloor: 2.64,
    secondFloor: 2.4,
    thirdFloor: 1.8,
    fourthFloorAndAbove: 1.2,
    basement: 1.2,
  };

  const floorTypes = [
    "Ground Floor",
    "First Floor",
    "Second Floor",
    "Third Floor",
    "Fourth Floor & Above",
    "Basement",
  ];

  const handleNumberOfStoreysChange = (value: string) => {
    setNumberOfStoreys(value);
    const numStoreys = parseInt(value, 10);
    if (numStoreys > 0) {
      const newFloors: Floor[] = [];
      for (let i = 0; i < numStoreys; i++) {
        newFloors.push({ type: floorTypes[0], length: "", width: "" });
      }
      setFloors(newFloors);
    } else {
      setFloors([]);
    }
  };

  const addFloor = () => {
    if (!numberOfStoreys || parseInt(numberOfStoreys, 10) === 0) {
      Alert.alert("Error", "Please enter the number of storeys first");
      return;
    }
    
    setShowFloorTypeModal(true);
  };

  const confirmAddFloor = (floorType: string) => {
    setFloors([...floors, { type: floorType, length: "", width: "" }]);
    setNumberOfStoreys((prev) => {
      const currentNum = parseInt(prev, 10) || 0;
      return (currentNum + 1).toString();
    });
    setShowFloorTypeModal(false);
    
    // Scroll to the bottom after adding a new floor
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const removeFloor = (index: number) => {
    const newFloors = [...floors];
    newFloors.splice(index, 1);
    setFloors(newFloors);
    
    // Update the number of storeys
    setNumberOfStoreys((prev) => {
      const currentNum = parseInt(prev, 10) || 0;
      return Math.max(0, currentNum - 1).toString();
    });
  };

  const calculateCost = () => {
    if (
      !name ||
      !address ||
      !location ||
      !useOfPremises ||
      !numberOfStoreys ||
      floors.some((floor) => !floor.length || !floor.width)
    ) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    let totalCost = 0;
    floors.forEach((floor) => {
      const length = parseFloat(floor.length);
      const width = parseFloat(floor.width);
      let rate: number = 0;

      switch (floor.type) {
        case "Ground Floor":
          rate = rates.groundFloor;
          break;
        case "First Floor":
          rate = rates.firstFloor;
          break;
        case "Second Floor":
          rate = rates.secondFloor;
          break;
        case "Third Floor":
          rate = rates.thirdFloor;
          break;
        case "Fourth Floor & Above":
        case "Basement":
          rate = rates.fourthFloorAndAbove;
          break;
        default:
          rate = rates.groundFloor;
      }

      const floorCost = (length * width * rate) / 9; // Calculate cost per floor
      totalCost += floorCost;
    });

    const reviewFee = totalCost + 24; // Add fixed review fee
    let finalCost = reviewFee + 84; // Add fixed final cost

    // Apply discount for specific use of premises
    if (useOfPremises.toLowerCase() === "church" || useOfPremises.toLowerCase() === "school") {
      finalCost /= 2; // Apply 50% discount
    }

    // Update state with calculated costs
    setReviewFee(parseFloat(reviewFee.toFixed(2)));
    setFinalCost(parseFloat(finalCost.toFixed(2)));
  };

  const handleSubmitApplication = () => {
    if (reviewFee <= 0) {
      Alert.alert("Error", "Please calculate the cost first");
      return;
    }
    
    setShowSubmissionMessage(true);
    
    // In a real app, here you would handle the submission to a server
    // For download functionality, you might need to use a library like react-native-fs
    // to generate a PDF or use a backend service
  };

  const closeSubmissionMessage = () => {
    setShowSubmissionMessage(false);
    // Here you could trigger the download functionality
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        ref={scrollViewRef}
        contentContainerStyle={styles.scrollContainer}
      >
        <Text style={styles.header}>Certificate Application</Text>
        <Text style={styles.subheader}>
          Complete this form to apply for a Fire Service Emergency Response Certificate
        </Text>

        <Text style={styles.sectionHeader}>Applicant Information</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your full name"
            value={name}
            onChangeText={setName}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Address</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your address"
            value={address}
            onChangeText={setAddress}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Location</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter the location"
            value={location}
            onChangeText={setLocation}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Use of Premises</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. Residential, Commercial, Church, School"
            value={useOfPremises}
            onChangeText={setUseOfPremises}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Service Required</Text>
          <Text style={styles.inputText}>Certificate</Text>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Number of Storeys</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter number of storeys"
            value={numberOfStoreys}
            onChangeText={handleNumberOfStoreysChange}
            keyboardType="numeric"
          />
        </View>

        <Text style={styles.sectionHeader}>Building Details</Text>

        <View style={styles.infoBox}>
          <Text style={styles.infoBoxTitle}>Floor Rates Information</Text>
          <Text style={styles.infoBoxText}>
            - Ground Floor: ¢3.00 per m²
          </Text>
          <Text style={styles.infoBoxText}>
            - First Floor: ¢2.64 per m²
          </Text>
          <Text style={styles.infoBoxText}>
            - Second Floor: ¢2.40 per m²
          </Text>
          <Text style={styles.infoBoxText}>
            - Third Floor: ¢1.80 per m²
          </Text>
          <Text style={styles.infoBoxText}>
            - Fourth Floor & Above: ¢1.20 per m²
          </Text>
          <Text style={styles.infoBoxText}>
            - Basement: ¢1.20 per m²
          </Text>
        </View>

        {floors.map((floor, index) => (
          <View key={index} style={styles.floorContainer}>
            <View style={styles.floorHeader}>
              <Picker
                selectedValue={floor.type}
                style={styles.picker}
                onValueChange={(itemValue) => {
                  const newFloors = [...floors];
                  newFloors[index].type = itemValue;
                  setFloors(newFloors);
                }}
              >
                {floorTypes.map((type) => (
                  <Picker.Item key={type} label={type} value={type} />
                ))}
              </Picker>
              <TouchableOpacity onPress={() => removeFloor(index)}>
                <Text style={styles.removeText}>Remove</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Length (m)</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter length"
                value={floor.length}
                onChangeText={(text) => {
                  const newFloors = [...floors];
                  newFloors[index].length = text;
                  setFloors(newFloors);
                }}
                keyboardType="numeric"
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Width (m)</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter width"
                value={floor.width}
                onChangeText={(text) => {
                  const newFloors = [...floors];
                  newFloors[index].width = text;
                  setFloors(newFloors);
                }}
                keyboardType="numeric"
              />
            </View>
          </View>
        ))}

        <TouchableOpacity style={styles.addFloorButton} onPress={addFloor}>
          <Text style={styles.addFloorButtonText}>+ Add Floor</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.calculateButton} onPress={calculateCost}>
          <Text style={styles.calculateButtonText}>Calculate Cost</Text>
        </TouchableOpacity>

        {reviewFee > 0 && (
          <View style={styles.costContainer}>
            <Text style={styles.costLabel}>Subtotal: ¢{(reviewFee - 24).toFixed(2)}</Text>
            <Text style={styles.costLabel}>Review Fee: ¢{reviewFee.toFixed(2)}</Text>
            <Text style={styles.costLabelTotal}>
              Total Cost: ¢{finalCost.toFixed(2)}
            </Text>
          </View>
        )}

        <TouchableOpacity 
          style={styles.submitButton} 
          onPress={handleSubmitApplication}
        >
          <Text style={styles.submitButtonText}>Submit Application</Text>
        </TouchableOpacity>
      </ScrollView>
      
      {/* Floor Type Selection Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showFloorTypeModal}
        onRequestClose={() => setShowFloorTypeModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Floor Type</Text>
            {floorTypes.map((type) => (
              <TouchableOpacity 
                key={type} 
                style={styles.modalButton}
                onPress={() => confirmAddFloor(type)}
              >
                <Text style={styles.modalButtonText}>{type}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity 
              style={styles.modalCancelButton}
              onPress={() => setShowFloorTypeModal(false)}
            >
              <Text style={styles.modalCancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      
      {/* Submission Confirmation Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={showSubmissionMessage}
        onRequestClose={() => setShowSubmissionMessage(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Application Submitted</Text>
            <Text style={styles.modalText}>
              Your application has been successfully submitted.
            </Text>
            <TouchableOpacity 
              style={styles.downloadButton}
              onPress={() => {
                Alert.alert("Download", "Download functionality would be implemented here");
                closeSubmissionMessage();
              }}
            >
              <Text style={styles.downloadButtonText}>Download Application</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.modalButton}
              onPress={closeSubmissionMessage}
            >
              <Text style={styles.modalButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  subheader: {
    fontSize: 14,
    color: "gray",
    marginBottom: 20,
    textAlign: "center",
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: "white",
    marginBottom: 10,
  },
  inputText: {
    fontSize: 14,
    color: "gray",
    marginBottom: 15,
  },
  infoBox: {
    backgroundColor: "#fff9e6",
    borderColor: "#ffcc00",
    borderWidth: 1,
    borderRadius: 5,
    padding: 15,
    marginBottom: 20,
  },
  infoBoxTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  infoBoxText: {
    fontSize: 14,
    color: "#666",
  },
  floorContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 15,
    marginBottom: 15,
    backgroundColor: "white",
  },
  floorHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  picker: {
    flex: 1,
  },
  removeText: {
    color: "red",
    fontWeight: "bold",
    marginLeft: 10,
  },
  addFloorButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  addFloorButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  calculateButton: {
    backgroundColor: "#28a745",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  calculateButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  costContainer: {
    marginTop: 20,
  },
  costLabel: {
    fontSize: 16,
    marginBottom: 5,
  },
  costLabelTotal: {
    fontSize: 18,
    fontWeight: "bold",
    color: "red",
  },
  submitButton: {
    backgroundColor: "red",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  submitButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  // Modal styles
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  modalText: {
    fontSize: 14,
    marginBottom: 15,
    textAlign: "center",
  },
  modalButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    width: "100%",
    marginVertical: 5,
  },
  modalButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  modalCancelButton: {
    backgroundColor: "#f44336",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    width: "100%",
    marginTop: 10,
  },
  modalCancelButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  downloadButton: {
    backgroundColor: "#28a745",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
  },
  downloadButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default CertificateApplicationScreen;