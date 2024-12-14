import { MapParamList } from "@/src/data/types";
import { useRoute, RouteProp } from "@react-navigation/native";
import React from "react";
import { View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import styles from "@/src/screens/MapScreen/styles";

const MapScreen = () => {
  const route = useRoute<RouteProp<MapParamList, "map">>();

  const { coordinates } = route.params;

  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapStyle}
        region={{
          latitude: coordinates.latitude,
          longitude: coordinates.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        mapType="standard"
        provider={PROVIDER_GOOGLE}
        onMapReady={() => console.log("Map is ready")}
        onRegionChange={() => console.log("Region change")}
        showsUserLocation={true}
      >
        <Marker
          title="I am here"
          coordinate={{
            latitude: coordinates.latitude,
            longitude: coordinates.longitude,
          }}
          description="Hello"
        />
      </MapView>
    </View>
  );
};

export default MapScreen;
