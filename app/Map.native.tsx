import React from 'react';
import MapView, { Marker, Region } from 'react-native-maps';

interface MapProps {
  region: Region;
  onRegionChangeComplete?: (region: Region) => void;
  style?: any;
}

const Map: React.FC<MapProps> = ({ region, onRegionChangeComplete, style }) => {
  return (
    <MapView
      style={style}
      region={region}
      onRegionChangeComplete={onRegionChangeComplete}
    >
      <Marker coordinate={region} draggable />
    </MapView>
  );
};

export default Map;