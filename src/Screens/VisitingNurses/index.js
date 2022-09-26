import React, { useEffect, useState } from 'react'
import { FlatList, Image, ScrollView, StyleSheet, Text, View, RefreshControl, TouchableOpacity, ActivityIndicator } from 'react-native'
import { doctorImg, FemaleDoctorImg, MaleDoctorImg } from '../../Assets'
import { Header, Searchbar } from '../../Components'
import NurseMiddleware from '../../Store/Middleware/NurseMiddleware'
import { Colors } from '../../Styles'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { IMG_URL } from '../../Store/Apis'
import moment from 'moment'

const VisitingNurses = props => {
    const doctorsList = [
        { name: 'Dr. John Doe', image: doctorImg, type: 'Nurse' },
        { name: 'Dr. Stella', image: FemaleDoctorImg, type: 'Cardiologist' },
        { name: 'Dr. Wolf Heyman', image: MaleDoctorImg, type: 'Eyes Specialist' },
        { name: 'Dr. John Doe', image: doctorImg, type: 'Heart surgeon' },
        { name: 'Dr. Stella', image: FemaleDoctorImg, type: 'Child Specialist' },
        { name: 'Dr. Wolf Heyman', image: MaleDoctorImg, type: 'Dentist' },
    ];
    const NurseState = useSelector(state => state.NurseReducer);
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [loader, setLoader] = useState(true);
    const NurseData = NurseState?.Nurse;
    const NurseDataList = NurseState?.Nurse_list;
    const loading = NurseState?.loading;

    useEffect(() => {
        dispatch(NurseMiddleware.getNurse({ name: '' }))
            .then((data) => data ? setLoader(false) : setLoader(false))
            .catch(() => setLoader(false))
    }, []);

    const onPressLoadMore = () => {
        setLoader(true),
            dispatch(NurseMiddleware.getNurse({ next_page_url: NurseData.next_page_url }))
                .then((data) => data ? setLoader(false) : setLoader(false))
                .catch(() => setLoader(false))
    };

    const renderLoaderMoreButton = () => {
        return NurseData.next_page_url ? (
            loader ? (
                <ActivityIndicator
                    size={'large'}
                    color={'#1D9CD9'}
                    style={styles.loadMoreContentContainer}
                />
            ) : (
                <TouchableOpacity
                style={{ width: 110, alignSelf: 'center', marginVertical: 15, backgroundColor: Colors.LIGHT_GREEN, borderRadius: 5  }}
                    onPress={onPressLoadMore}>
                    <View style={{ alignSelf: 'center' }}>
                    <Text style={{color: '#fff', padding: 5,}}>Load more</Text>
                    </View>
                </TouchableOpacity>
            )
        ) : null;
    };

    const onRefreshServices = () => {
        setLoader(true),
            dispatch(NurseMiddleware.getNurse({ name: '' }))
                .then((data) => data ? setLoader(false) : setLoader(false))
                .catch(() => setLoader(false));

    };

    const onChangeSearchText = text => {
        clearTimeout(searchTimeout)
        let searchTimeout = setTimeout(() => {
            dispatch(NurseMiddleware.getNurse({ name: text }))
        }, 1500)

    };


    const renderOneDoctor = (item) => {
        //Back-end have to add type 
        // console.warn("Item===>", item);
        return (
            <TouchableOpacity
                onPress={() =>
                    navigation.navigate('NurseDetail', {
                        headerTitle: 'Visiting Nurse',
                        itemData: item
                    })
                }
                style={styles.userContainer}>
                <View style={styles.userSubContainer}>
                    <Image source={{ uri: IMG_URL + item.image }} style={styles.userimage} />
                    <View style={{ justifyContent: 'center', paddingHorizontal: 10 }}>
                        <Text style={styles.name}>{item.name}</Text>
                        {item?.type ?
                            <Text style={styles.dateAgo}>{item?.type}</Text>
                            : null}
                        <Text style={styles.dateAgo}>{moment('1 jan 1970 '+item?.time_from).format('hh:mm A')} to {moment('1 jan 1970 '+item?.time_to).format('hh:mm A')}</Text>
                    </View>
                </View>

            </TouchableOpacity>
        )
    }
    return (
        <View style={styles.container}>
            <View style={{ paddingHorizontal: 20 }}>
                <Header headerLeft={true} title={'Visiting Nurses'} />
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Searchbar onChangeText={onChangeSearchText} />
                <View>
                {!NurseData ? (
                            <ActivityIndicator
                                size={'large'}
                                color={'#1D9CD9'}
                                style={styles.loadMoreContentContainer}
                            />
            ) : null}
                {NurseDataList && NurseDataList?.length ? (
                <FlatList
                    refreshControl={
                        <RefreshControl
                            refreshing={loader}
                            onRefresh={onRefreshServices}
                        />
                    }
                    data={NurseDataList}
                    renderItem={({ item }) => (renderOneDoctor(item))}
                    ListFooterComponent={renderLoaderMoreButton}
                />
                ) : null}
                </View>
            </ScrollView>
        </View>
    )
}

export default VisitingNurses

const styles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: Colors.WHITE
    },
    userContainer: {
        flexDirection: 'row', backgroundColor: Colors.BG_GRAY, paddingVertical: 10, marginVertical: 10, marginHorizontal: 20,
    },
    userSubContainer: {
        flex: 1, flexDirection: 'row', paddingHorizontal: 10
    },
    userimage: {
        width: 50, height: 50, borderRadius: 100
    },
    name: {
        fontSize: 16, color: Colors.BLACK, fontWeight: 'bold'
    },
    dateAgo: { fontSize: 12, color: Colors.LIGHT_GRAY_1, fontWeight: '300' },
    buttonContainer: {
        marginRight: 5,
        paddingVertical: 10,
        alignSelf: 'center',
        borderRadius: 12,
        backgroundColor: Colors.LIGHT_GREEN,
        width: 110
    }
})