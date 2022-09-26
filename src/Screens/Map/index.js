import { View, Text } from 'react-native';
import React from 'react';
import { Colors } from '../../Styles';
import { Header, Searchbar } from '../../Components';
import MapView, { Marker } from 'react-native-maps';
import { styles } from './style';

const Map = props => {

  const lat = props.route.params.lat
  const lng = props.route.params.lng
  console.log(lat, lng)
  return (
    <View style={{ flex: 1, backgroundColor: Colors.WHITE }}>
      <View style={{ paddingHorizontal: 22 }}>
        <Header headerLeft={true} title={'Map'} />
      </View>

      {/* <View
        style={{position: 'absolute', top: 65, width: '100%', zIndex: 10000}}>
        <Searchbar />
      </View> */}

      <MapView
        style={styles.mapView}
        initialRegion={{
          latitude: lat,
          longitude: lng,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {
          (lat !== 40.7075694 && lng !== -74.0050887)
            ?
            <Marker
              coordinate={{ latitude: lat, longitude: lng }}
            />
            :
            null
        }
      </MapView>
    </View>
  );
};

export default Map;
