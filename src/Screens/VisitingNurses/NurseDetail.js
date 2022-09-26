import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, FlatList, ScrollView, Linking, Platform } from 'react-native';
import { banner_image } from '../../Assets';
import { Header, Searchbar, SubmitButton, Text } from '../../Components';
import { Colors } from '../../Styles';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import { IMG_URL } from '../../Store/Apis';
import moment from 'moment';

const NurseDetail = props => {

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
                    resizeMode={'cover'}
                />
                <Text style={styles.title}>{itemData?.name}</Text>
                {/* <Text style={styles.descTitle}>Time</Text> */}
                <Text style={styles.timing}>Time: {moment('1 jan 1970 '+itemData?.time_from).format('hh:mm A')} to {moment('1 jan 1970 '+itemData?.time_to).format('hh:mm A')}</Text>
                <Text style={styles.timing}>Phone Number: {itemData?.phone}</Text>
                <Text style={styles.descTitle}>Description</Text>
                <Text style={styles.description}>{itemData?.description}</Text>
                {/*  <Text style={styles.descTitle}>Direction</Text>
                <MapView
                    onPress={() => navigation.navigate('Map', {
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

                </MapView> */}

                <SubmitButton
                    onPress={() => callPharmacy(itemData?.phone)}
                    text={`Call`}
                    buttonContainer={styles.buttonContainer}
                />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
    },
    bannerImage: {
        borderRadius: 360,
        alignSelf: 'center',
        height: 150,
        width: 150,
        backgroundColor: 'lightgrey',
        marginTop: 12,
    },
    title: {
        marginVertical: 10,
        color: Colors.BLACK,
        fontSize: 20,
        alignSelf: 'center',
    },
    titleDescription: {
        marginTop: 10,
        marginBottom: 5,
        color: Colors.BLACK,
        fontSize: 20,
        fontWeight: 'normal',
    },
    description: {
        color: Colors.BLACK,
        fontSize: 12,
        marginLeft: 5,
        fontSize: 14,
        marginBottom: 10,
    },
    timing: {
        marginTop: 5,
        color: Colors.BLACK,
        fontSize: 16,
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
        bottom: 0,
        // position: 'absolute',
    },
});
export default NurseDetail;
