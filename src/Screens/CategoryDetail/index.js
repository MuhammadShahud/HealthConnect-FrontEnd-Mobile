import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, FlatList, ScrollView, Linking, Platform } from 'react-native';
import { banner_image } from '../../Assets';
import { Header, Searchbar, SubmitButton, Text } from '../../Components';
import { Colors } from '../../Styles';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import { IMG_URL } from '../../Store/Apis';

const CategoryDetail = props => {

  const navigation = useNavigation();
  const title = props.route.params?.headerTitle;
  const itemData = props.route.params.itemData

  const callPharmacy = (phone) => {

    let phoneNumber = '';

    if (Platform.OS === 'android') {
      phoneNumber = 'tel:${' + phone + '}';
    }
    else {
      phoneNumber = 'telprompt:${' + phone + '}';
    }

    Linking.openURL(phoneNumber);
  };

  return (
    <View style={styles.container}>
      <Header headerLeft={true} title={title} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image
          source={{ uri: IMG_URL + itemData?.image }}
          style={styles.bannerImage}
          resizeMode={'stretch'}
        />
        <Text style={styles.title}>{itemData?.name}</Text>
        <Text style={styles.description}>{itemData?.description}</Text>
        <Text style={styles.descTitle}>Directions</Text>
        <MapView
          onPress={() => navigation.navigate('Map',{
            lat: (itemData?.lat !== null) ? parseFloat(itemData?.lat) : 40.7075694,
            lng: (itemData?.lng !== null) ? parseFloat(itemData?.lng) : -74.0050887,
          })}
          style={styles.mapView}
          initialRegion={{
            latitude: (itemData?.lat !== null) ? parseFloat(itemData?.lat) : 40.7075694,
            longitude: (itemData?.lng !== null) ? parseFloat(itemData?.lng) : -74.0050887,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >

          {
            (itemData?.lat !== null && itemData?.lng !== null)
              ?
              <Marker
                coordinate={{ latitude: parseFloat(itemData?.lat), longitude: parseFloat(itemData?.lng) }}
              />
              :
              null
          }

        </MapView>

        <SubmitButton
          onPress={() => callPharmacy(itemData?.phone)}
          text={`Call ${title}`}
          buttonContainer={styles.buttonContainer}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 22,
  },
  bannerImage: {
    height: 250,
    width: '100%',
    borderRadius: 2,
    backgroundColor: 'lightgrey'
  },
  title: {
    marginVertical: 10,
    color: Colors.BLACK,
    fontSize: 20,
  },
  description: {
    color: Colors.BLACK,
    fontSize: 12,
    marginLeft: 5,
    fontSize: 14,
    marginVertical: 10,
  },
  descTitle: {
    marginVertical: 10,
    color: Colors.BLACK,
    fontSize: 16,
  },
  mapView: {
    height: 200,
    marginBottom: 10,
  },
  buttonContainer: {
    paddingVertical: 10,
    width: '100%',
    borderRadius: 5,
    backgroundColor: Colors.LIGHT_GREEN,
  },
});
export default CategoryDetail;
