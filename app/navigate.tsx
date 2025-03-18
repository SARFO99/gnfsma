// Example navigation from a button click
import { useNavigation, NavigationProp } from '@react-navigation/native';
type RootStackParamList = {
  reports: undefined;
}; // Define the type directly if the module is not found
import { TouchableOpacity, Text } from 'react-native';

const NavigateButton = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <TouchableOpacity onPress={() => navigation.navigate('reports')}>
      <Text>Go to Reports</Text>
    </TouchableOpacity>
  );
};

export default NavigateButton;