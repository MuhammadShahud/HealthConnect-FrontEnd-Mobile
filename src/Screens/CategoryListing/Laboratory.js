import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import {
    View,
    Image,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    ScrollView, RefreshControl, ActivityIndicator, Share, Alert
} from 'react-native';
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
import LaboratoryMiddleware from '../../Store/Middleware/LaboratoryMiddleware';
import LabReportsMiddleware from '../../Store/Middleware/LabReportsMiddleware';
import { useDispatch, useSelector } from 'react-redux';
import { IMG_URL } from '../../Store/Apis';
import RNFetchBlob from 'rn-fetch-blob';
import { getHeaders } from '../../Utils';

const report = [
    { image: ReportOne },
    { image: ReportTwo },
    { image: ReportThree },
    { image: ReportFour },
    { image: ReportFour },
];

const Laboratory = props => {
    const tab = props.route?.params?.tab;
    const [activeButton, setActiveButton] = useState(tab ? tab : 'laboratory');
    const [reports, setReport] = useState(report);
    const AuthState = useSelector(state => state.AuthReducer);
    const navigation = useNavigation();
    const LaboratoryState = useSelector(state => state.LaboratoryReducer);
    const [loader, setLoader] = useState(true);
    const LaboratoryData = LaboratoryState?.Laboratory;
    const LaboratoryDataList = LaboratoryState?.Laboratory_list;
    const loading = LaboratoryState?.loading;
    
    ///////////////for lab reports///////////////////
    const LabReportsState = useSelector(state => state.LabReportsReducer);
    const labreportsData = LabReportsState?.labreport;
    const labreportsDataList = LabReportsState?.labreport_list;

    // console.log('------------',LaboratoryDataList.length, AuthState.userRole);


    const dispatch = useDispatch();

    useEffect(() => {
        setLoader(true)
        //============= For Laboratory Listing ============
        dispatch(LaboratoryMiddleware.getLaboratory({ name: '' }))
            .then((data) => data ? setLoader(false) : setLoader(false))
            .catch(() => setLoader(false))

        //============= For Lab Report ============
            dispatch(LabReportsMiddleware.getLabReports({ name: '' }))
        .then((data) => data ? setLoader(false) : setLoader(false))
        .catch(() => setLoader(false))
    }, []);

    //============= For Laboratory Listing ============
    const onPressLoadMore = () => {
        setLoader(true),
            dispatch(LaboratoryMiddleware.getLaboratory({ next_page_url: LaboratoryData?.next_page_url }))
                .then((data) => data ? setLoader(false) : setLoader(false))
                .catch(() => setLoader(false))
    };


    const laboratoryLoadMoreButton = () => {
        return LaboratoryData?.next_page_url ? (
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
        // console.log('no');
        setLoader(true),
            dispatch(LaboratoryMiddleware.getLaboratory({ name: '' }))
                .then((data) => data ? setLoader(false) : setLoader(false))
                .catch(() => setLoader(false));

    };


    const onChangeSearchText = text => {

        clearTimeout(searchTimeout)
    let searchTimeout = setTimeout(() => {
            dispatch(LaboratoryMiddleware.getLaboratory({ name: text }))
        }, 1500)

    };

    //============= For Laboratory Listing ============



    //=============For lab report listing=======================

    const loadMoreLabReports = () => {
        setLoader(true),
            dispatch(LabReportsMiddleware.getLabReports({ next_page_url: labreportsData?.next_page_url }))
                .then((data) => data ? setLoader(false) : setLoader(false))
                .catch(() => setLoader(false))
    };


    const refreshLabReportServices = () => {
        // console.log('yes');
      setLoader(true),
          dispatch(LabReportsMiddleware.getLabReports({ name: '' }))
              .then((data) => data ? setLoader(false) : setLoader(false))
              .catch(() => setLoader(false));
    
    };    
    
    const renderLoaderMoreButton = () => {
      return labreportsData?.next_page_url ? (
          loader ? (
              <ActivityIndicator
                  size={'large'}
                  color={'#1D9CD9'}
                  style={styles.loadMoreContentContainer}
              />
          ) : (
              <TouchableOpacity
              style={{ width: 110, alignSelf: 'center', marginVertical: 15, backgroundColor: Colors.LIGHT_GREEN, borderRadius: 5  }}
                  onPress={loadMoreLabReports}>
                  <View style={{ alignSelf: 'center' }}>
                  <Text style={{color: '#fff', padding: 5,}}>Load more</Text>
                  </View>
              </TouchableOpacity>
          )
      ) : null;
    };


    const ShareDocument = async (file) => {
        try {
          const result = await Share.share({
            message: IMG_URL+file,
          });
          if (result.action === Share.sharedAction) {
            if (result.activityType) {
              // shared with activity type of result.activityType
            } else {
              // shared
            }
          } else if (result.action === Share.dismissedAction) {
            // dismissed
          }
        } catch (error) {
          alert(error.message);
        }
      };


      const DownloadDocument = async (file) => {
          setLoader(true)

        let dirs = RNFetchBlob.fs.dirs
      let headers = (await getHeaders()).documentheaders

      await RNFetchBlob
        .config({
          timeout: 60 * 60,
          fileCache: true,
          path: dirs.DownloadDir + '/' + file,
          addAndroidDownloads: {
            useDownloadManager: true,
            notification: true,
            title: file,
            path: dirs.DownloadDir + '/' + file,
          },

        })
        .fetch("GET", IMG_URL + file,
          headers,
        )

        .then((res) => {
          console.warn('The file saved to ', res)
          Alert.alert('Note','File Downloaded Successfully.');
          setLoader(false)
        }).catch((err) => {
          console.log(err);
          setLoader(false)
        })

      }

    //=============For lab report listing=======================


    const renderCategoryCard = ({ item, index }) => {
        // console.warn('=========>', props?.route?.params?.headerTitle);
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

    const renderReports = ({ item }) => {
        let doc = item?.file.split(".")
        let extension = doc[1]
        return (
            <View style={style.historyContainer}>
                {/* <Image source={item.image} style={{ width: '100%', height: 200 }} /> */}
                <View style={{ width: '100%', height: 200, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{fontSize: 20, fontWeight: 'bold', color: Colors.RED}}>{extension}</Text>
                </View>

                <View
                    style={{
                        width: '60%',
                        height: 35,
                        backgroundColor: 'rgba(0,0,0,0.6)',
                        position: 'absolute',
                        flexDirection: 'row',
                        justifyContent: 'space-evenly'
                    }}>

                    <TouchableOpacity
                    onPress={()=>navigation.navigate('ChatStack', item)}
                        style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <MaterialCommunityIcons
                            name="reply"
                            color={Colors.WHITE}
                            size={22}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                    onPress={()=>DownloadDocument(item?.file)}
                        style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Feather name="download" color={Colors.WHITE} size={22} />
                    </TouchableOpacity>

                    <TouchableOpacity
                    onPress={()=>ShareDocument(item?.file)}
                        style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <MaterialCommunityIcons
                            name="share"
                            color={Colors.WHITE}
                            size={22}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    return (
        <View style={style.container}>
            <View style={styles.PH22}>
                <Header headerLeft={true} title={props?.route.params.headerTitle} />
            </View>

            {AuthState.userRole === 'patient' &&
                props?.route.params.headerTitle == 'Laboratory' ? (
                <View style={style.buttonContainer}>
                    <TouchableOpacity
                        onPress={() => setActiveButton('laboratory')}
                        style={[
                            style.button,
                            {
                                backgroundColor:
                                    activeButton === 'laboratory'
                                        ? Colors.LIGHT_GREEN
                                        : Colors.GRAY,
                            },
                        ]}>
                        <Text style={{ color: Colors.WHITE }}>Laboratory</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => setActiveButton('report')}
                        style={[
                            style.button,
                            {
                                backgroundColor:
                                    activeButton === 'report' ? Colors.LIGHT_GREEN : Colors.GRAY,
                            },
                        ]}>
                        <Text style={{ color: Colors.WHITE }}>My Reports</Text>
                    </TouchableOpacity>
                </View>
            ) : null}

            {activeButton === 'laboratory' ?
                <Searchbar onChangeText={onChangeSearchText} />
                : null}

            <ScrollView style={styles.listContainer}>
                <View>
                {!LaboratoryData ? (
                            <ActivityIndicator
                                size={'large'}
                                color={'#1D9CD9'}
                                style={styles.loadMoreContentContainer}
                            />
                ) : null}
                {LaboratoryDataList && LaboratoryDataList?.length ? (
                <FlatList
                    refreshControl={
                        <RefreshControl
                            refreshing={loader}
                            onRefresh={activeButton == 'laboratory' ? onRefreshServices : refreshLabReportServices }
                        />
                    }
                    numColumns={2}
                    data={activeButton == 'laboratory' ? LaboratoryDataList : labreportsDataList}

                    renderItem={
                        activeButton == 'laboratory' ? renderCategoryCard : renderReports
                    }
                    ListFooterComponent={activeButton == 'laboratory' ? laboratoryLoadMoreButton : renderLoaderMoreButton }
                    keyExtractor={(item, index) => index.toString()}
                />
                ) : null}
                </View>
            </ScrollView>

            {activeButton === 'report' ? (
                <View>
                    <SubmitButton
                        onPress={() => navigation.navigate('AddReport')}
                        text={'Add New Lab Report'}
                        buttonContainer={[styles.buttonContainer, { paddingVertical: 16 }]}
                    />

                    {/* const renderCategoryCard = ({ index }) => {
        return (
            <View style={[styles.categoryCardContainer, {
                marginRight: index % 2 == 0 ? 5 : undefined,
                marginLeft: index % 2 !== 0 ? 5 : undefined,

            }]}>
                <Image source={banner_image} style={styles.bannerImage} resizeMode={'stretch'} />
                <Text style={styles.title}>ABC Laboratory</Text>
                <Text style={styles.categoryDistance}>7 miles</Text>
                <SubmitButton
                    onPress={() => navigation.navigate('CategoryDetail')}
                    text={'Directions'}
                    buttonContainer={styles.buttonContainer}
                    textStyle={styles.FS13}
                />

            </View>
        )
    } */}
                </View>
            ) : null}
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
        paddingHorizontal: 20,
        maorginTp: 10,
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
});

export default Laboratory;
