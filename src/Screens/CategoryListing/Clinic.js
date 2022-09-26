import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
    View,
    Image,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    ScrollView,
    ActivityIndicator, RefreshControl
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import {
    banner_image,
    ReportFour,
    ReportOne,
    ReportThree,
    ReportTwo,
} from '../../Assets';
import { Header, Searchbar, SubmitButton, Text } from '../../Components';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import { Colors } from '../../Styles';
import { style } from './style';
import { IMG_URL } from '../../Store/Apis';
import TransportMiddleware from '../../Store/Middleware/TransportMiddleware';
import ClinicMiddleware from '../../Store/Middleware/ClinicMiddleware';

const report = [
    { image: ReportOne },
    { image: ReportTwo },
    { image: ReportThree },
    { image: ReportFour },
    { image: ReportFour },
];

const Clinic = props => {
    const tab = props.route?.params?.tab;
    const [activeButton, setActiveButton] = useState(tab ? tab : 'laboratory');
    const [reports, setReport] = useState(report);
    const [loader, setLoader] = useState(true);
    const [search, setSearch] = useState('');
    const AuthState = useSelector(state => state.AuthReducer);
    const navigation = useNavigation();
    const ClinicState = useSelector(state => state.ClinicReducer);
    const dispatch = useDispatch();

    const ClinicData = ClinicState?.Clinic;
    const ClinicDataList = ClinicState?.Clinic_list;
    const loading = ClinicState?.loading;

    useEffect(() => {
        dispatch(ClinicMiddleware.getClinic({ name: '' }))
            .then((data) => data ? setLoader(false) : setLoader(false))
            .catch(() => setLoader(false))
    }, []);

    //============= For Transport Listing ============
    const onPressLoadMore = () => {
        setLoader(true),
            dispatch(ClinicMiddleware.getClinic({ next_page_url: ClinicData.next_page_url }))
                .then((data) => data ? setLoader(false) : setLoader(false))
                .catch(() => setLoader(false))
    };


    const renderLoaderMoreButton = () => {
        return ClinicData.next_page_url ? (
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
                    <View style={styles.loadMoreContainer}>
                    <Text style={{color: '#fff', padding: 5,}}>Load more</Text>
                    </View>
                </TouchableOpacity>
            )
        ) : null;
    };

    const onRefreshServices = () => {
        setLoader(true),
            dispatch(ClinicMiddleware.getClinic({ name: '' }))
                .then((data) => data ? setLoader(false) : setLoader(false))
                .catch(() => setLoader(false));

    };
    const onChangeSearchText = text => {
        clearTimeout(searchTimeout)
        let searchTimeout = setTimeout(() => {
            dispatch(ClinicMiddleware.getClinic({ name: text }))
        }, 1500)

    };

    const renderCategoryCard = ({ item, index }) => {
        // console.warn('=========>',item);
        return (
            <View
                style={[
                    styles.categoryCardContainer,
                    {
                        marginRight: index % 2 == 0 ? 5 : undefined,
                        marginLeft: index % 2 !== 0 ? 5 : undefined,
                    },
                ]}>
                <Image
                    source={{ uri: IMG_URL + item.image }}
                    style={styles.bannerImage}
                    resizeMode={'stretch'}
                />
                <Text
                    style={styles.title}>{`${item.name}`}</Text>
                {/* <Text style={styles.categoryDistance}>{item.number} miles</Text> */}
                <SubmitButton
                    onPress={() =>
                        navigation.navigate('CategoryDetail', {
                            headerTitle: props?.route.params.headerTitle,
                            itemData: item
                        })
                    }
                    text={'Directions'}
                    buttonContainer={styles.buttonContainer}
                    textStyle={styles.FS13}
                />
            </View>
        );
    };


    console.warn('=========>', props?.route?.params?.headerTitle);
    return (
        <View style={style.container}>
            <View style={styles.PH22}>
                <Header headerLeft={true}
                    // title={props?.route.params.headerTitle}
                    title={props?.route.params.headerTitle} />
            </View>



            <Searchbar onChangeText={onChangeSearchText} />

            <View style={styles.listContainer}>
                {props?.route?.params?.headerTitle == 'Private Clinic' ?
                    <View>
                        {!ClinicData ? (
                            <ActivityIndicator
                                size={'large'}
                                color={'#1D9CD9'}
                                style={styles.loadMoreContentContainer}
                            />
                        ) : null}
                        {ClinicDataList && ClinicDataList?.length ? (
                            <FlatList
                                refreshControl={
                                    <RefreshControl
                                        refreshing={loader}
                                        onRefresh={onRefreshServices}
                                    />
                                }
                                numColumns={2}
                                data={ClinicDataList}
                                renderItem={renderCategoryCard}
                                ListFooterComponent={renderLoaderMoreButton}
                                keyExtractor={(item, index) => index.toString()}
                            />
                        ) : null}
                    </View>
                    :
                    null
                }

            </View>

        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.WHITE,
    },
    FS13: {
        fontSize: 13,
    },
    bannerImage: {
        height: 120,
        width: '100%',
    },
    PH22: {
        paddingHorizontal: 22,
    },
    categoryDistance: {
        color: Colors.BLACK,
        fontSize: 10,
        marginLeft: 5,
    },
    title: {
        color: Colors.BLACK,
        marginVertical: 5,
        marginLeft: 5,
    },
    listContainer: {
        flex: 1,
        paddingHorizontal: 20,
        marginTop: 10,
    },
    categoryCardContainer: {
        flex: 1,
        backgroundColor: Colors.BG_GRAY,
        marginVertical: 10,
        elevation: 1,
    },
    buttonContainer: {
        paddingVertical: 7,
        width: '95%',
        borderRadius: 5,
        backgroundColor: Colors.LIGHT_GREEN,
    },
    loadMoreContentContainer: {
        justifyContent: 'center',
        alignSelf: 'center',
        width: 120,
        marginVertical: 20,
    },
});

export default Clinic;
