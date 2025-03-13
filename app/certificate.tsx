import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { SafeAreaView } from "react-native-safe-area-context";

type Floor = {
  length: string;
  width: string;
};

const CertificateApplicationScreen = () => {
  const [name, setName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [useOfPremises, setUseOfPremises] = useState<string>("");
  const [serviceRequired, setServiceRequired] = useState<string>("Certificate"); // Default value
  const [date, setDate] = useState<string>("");
  const [numberOfStoreys, setNumberOfStoreys] = useState<string>("");
  const [floors, setFloors] = useState<Floor[]>([]);
  const [reviewFee, setReviewFee] = useState<number>(0);
  const [finalCost, setFinalCost] = useState<number>(0);

  const rates = {
    groundFloor: 3,
    firstFloor: 2.64,
    secondFloor: 2.4,
    thirdFloor: 1.8,
    fourthFloorAndAbove: 1.2,
    basement: 1.2,
  };

  const handleNumberOfStoreysChange = (value: string) => {
    setNumberOfStoreys(value);
    const numStoreys = parseInt(value, 10);
    if (numStoreys > 0) {
      const newFloors: Floor[] = [];
      for (let i = 0; i < numStoreys; i++) {
        newFloors.push({ length: "", width: "" });
      }
      setFloors(newFloors);
    } else {
      setFloors([]);
    }
  };

  const calculateCost = () => {
    if (
      !name ||
      !address ||
      !location ||
      !useOfPremises ||
      !date ||
      !numberOfStoreys ||
      floors.some((floor) => !floor.length || !floor.width)
    ) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    let totalCost = 0;
    floors.forEach((floor, index) => {
      const length = parseFloat(floor.length);
      const width = parseFloat(floor.width);
      let rate: number;
      switch (index) {
        case 0:
          rate = rates.groundFloor;
          break;
        case 1:
          rate = rates.firstFloor;
          break;
        case 2:
          rate = rates.secondFloor;
          break;
        case 3:
          rate = rates.thirdFloor;
          break;
        default:
          rate = rates.fourthFloorAndAbove;
      }
      const floorCost = (length * width * rate) / 9;
      totalCost += floorCost;
    });

    const reviewFee = totalCost + 24;
    const finalCost = reviewFee + 84;

    setReviewFee(parseInt(reviewFee.toFixed(2), 10));
    setFinalCost(parseInt(finalCost.toFixed(2), 10));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.header}>Certificate Application</Text>

      
<Text  style={styles.input1}>Certificate</Text>

        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          placeholderTextColor="gray"
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Address"
          value={address}
          placeholderTextColor="gray"
          onChangeText={setAddress}
        />
        <TextInput
          style={styles.input}
          placeholder="Location"
          placeholderTextColor="gray"
          value={location}
          onChangeText={setLocation}
        />
        <TextInput
          style={styles.input}
          placeholder="Use of Premises"
          placeholderTextColor="gray"
          value={useOfPremises}
          onChangeText={setUseOfPremises}
        />

        <TextInput
          style={styles.input}
          placeholder="Date (YYYY-MM-DD)"
          value={date}
          onChangeText={setDate}
        />
        <TextInput
          style={styles.input}
          placeholder="Number of Storeys"
          value={numberOfStoreys}
          placeholderTextColor="gray"
          onChangeText={handleNumberOfStoreysChange}
          keyboardType="numeric"
        />

        {floors.map((floor, index) => (
          <View key={index} style={styles.floorContainer}>
            <Text style={styles.floorTitle}>Floor {index + 1}</Text>
            <TextInput
              style={styles.input}
              placeholder={`Length (Floor ${index + 1})`}
              value={floor.length}
              placeholderTextColor="gray"
              onChangeText={(text) => {
                const newFloors = [...floors];
                newFloors[index].length = text;
                setFloors(newFloors);
              }}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              placeholder={`Width (Floor ${index + 1})`}
              value={floor.width}
              placeholderTextColor="gray"
              onChangeText={(text) => {
                const newFloors = [...floors];
                newFloors[index].width = text;
                setFloors(newFloors);
              }}
              keyboardType="numeric"
            />
          </View>
        ))}

        <TouchableOpacity style={styles.button} onPress={calculateCost}>
          <Text style={styles.buttonText}>Calculate Cost</Text>
        </TouchableOpacity>

        {reviewFee > 0 && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultText}>Review Fee: ¢{reviewFee}</Text>
            <Text style={styles.resultText}>
              Final Cost of Application: ¢{finalCost}
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  input1: {
    width: "100%",
    height: 20,
    borderColor: "gray",
   
  },
  pickerContainer: {
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
  },
  picker: {
    width: "100%",
    height: 40,
  },
  floorContainer: {
    marginBottom: 20,
  },
  floorTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  button: {
    width: "100%",
    height: 40,
    backgroundColor: "blue",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  resultContainer: {
    marginTop: 20,
  },
  resultText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default CertificateApplicationScreen;
