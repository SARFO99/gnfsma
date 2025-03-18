import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Region {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

interface MapProps {
  region: Region;
  onRegionChangeComplete?: (region: Region) => void;
  style?: any;
}

const Map: React.FC<MapProps> = ({ style }) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.text}>Map is not available on web</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    flex: 1,
    width: '100%',
  },
  text: {
    fontSize: 18,
    color: '#666',
  }
});

export default Map;