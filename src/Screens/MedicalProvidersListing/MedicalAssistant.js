import {useNavigation} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {FlatList, Image, Text, TouchableOpacity, View, ActivityIndicator, RefreshControl, StyleSheet} from 'react-native';
import {AirbnbRating} from 'react-native-ratings';
import {useDispatch, useSelector} from 'react-redux';
import {
  doctorImg,
  FemaleDoctorImg,
  FilterIcon,
  MaleDoctorImg,
} from '../../Assets';
import {Header, Popup, Searchbar} from '../../Components';
import DoctorMiddleware from '../../Store/Middleware/DoctorMiddleware';
import {Colors} from '../../Styles';
import {style} from './style';
import { IMG_URL } from '../../Store/Apis';
import MedicalAssistantMiddleware from '../../Store/Middleware/MedicalAssistantMiddleware';

const MedicalAssistant = props => {

    const {name, isFromDoctorDashboard} = props.route.params?.item;
    const navigation = useNavigation();
    const MedicalAssistantState = useSelector(state => state.MedicalAssistantReducer);
    const dispatch = useDispatch();
    const  medicalAssistantData = MedicalAssistantState?.medicalassistant;
    const  [medicalAssistantList, setmedicalAssistantList] = useState([]);
    const loading = MedicalAssistantState?.loading;
    const [loader, setLoader] = useState(true);
    const [isVisible, setIsVisible] = useState(false);
    const [image, setImage] = useState(null)
    const [assistantname, setAssistantName] = useState(null)
    
    // console.log('+++++++',medicalAssistantList);

    useEffect(() => {
        onRefreshServices()
    }, []);

    // const onPressLoadMore = () => {
    //     setLoader(true),
    //         dispatch(MedicalAssistantMiddleware.getMedicalAssistant({ next_page_url: medicalAssistantData.next_page_url }))
    //             .then((data) => data ? setLoader(false) : setLoader(false))
    //             .catch(() => setLoader(false))
    // };


    // const renderLoaderMoreButton = () => {
    //     return medicalAssistantData.next_page_url ? (
    //         loader ? (
    //             <ActivityIndicator
    //                 size={'large'}
    //                 color={'#1D9CD9'}
    //                 style={styles.loadMoreContentContainer}
    //             />
    //         ) : (
    //             <TouchableOpacity
    //                 style={{ width: 110, alignSelf: 'center', marginVertical: 15 }}
    //                 onPress={onPressLoadMore}>
    //                 <View style={{ alignSelf: 'center' }}>
    //                     <Text style={styles.loadMoreText}>Load more</Text>
    //                 </View>
    //             </TouchableOpacity>
    //         )
    //     ) : null;
    // };

    const onRefreshServices = () => {
        setLoader(true)
        dispatch(MedicalAssistantMiddleware.getMedicalAssistant({ name: '' }))
        .then((data) => {
            // console.log('------',data);
            setmedicalAssistantList(data?.data)
            data ? setLoader(false) : setLoader(false)
        })
        .catch(() => setLoader(false))

    };


    const onChangeSearchText = text => {
        setLoader(true)
        clearTimeout(searchTimeout)
    let searchTimeout = setTimeout(() => {
            dispatch(MedicalAssistantMiddleware.getMedicalAssistant({ name: text }))
            .then((data) => {
                // console.log('------',data);
                setmedicalAssistantList(data?.data)
                data ? setLoader(false) : setLoader(false)
            })
            .catch(() => setLoader(false))
        }, 1500)

    };

    const onPressRequest = (id) => {
        setLoader(true),
        dispatch(MedicalAssistantMiddleware.requestMedicalAssistant(id))
        .then((data) => {
            onRefreshServices()
            setIsVisible(true)
            data ? setLoader(false) : setLoader(false)
        })
        .catch(() => setLoader(false))
    }

    const renderMedicalAssistantList = ({item}) => {
        // console.log(item);
        return (
            <View
            style={style.listContainer}
            >
            <Image source={item?.image ? {uri: IMG_URL + item?.image} : require('../../Assets/Images/avatar.png')} style={style.image} />

            <View style={{flex: 1, paddingHorizontal: 10}}>
                <Text style={style.name}>{item?.name}</Text>
                <Text style={{paddingVertical: 2, color: '#000'}}>{item?.speciality}</Text>
           </View>

           {item?.is_requested == 0 ?
           <TouchableOpacity
           onPress={()=>{
               onPressRequest(item?.id)
            setImage(item?.image);
            setAssistantName(item?.name);
            }}
            style={style.cancelButton}>
            <Text style={style.buttonText}>Request</Text>
          </TouchableOpacity>
          :
          <View>
              <Text style={{color : Colors.LIGHT_GREEN}}>Requested</Text>
          </View>
          }

        </View>
        )
    }

    return(
        <View style={style.container}>
            
            <View style={{paddingHorizontal: 22}}>
                <Header headerLeft={true} title='Medical Assistant' />
            </View>

            <Searchbar onChangeText={onChangeSearchText} />

        {/* <View>
        {!medicalAssistantData ? (
                            <ActivityIndicator
                                size={'large'}
                                color={'#1D9CD9'}
                                style={styles.loadMoreContentContainer}
                            />
                        ) : null}
                        {medicalAssistantList && medicalAssistantList?.length ? ( */}
        <FlatList
        refreshControl={
        <RefreshControl
                refreshing={loader}
                onRefresh={onRefreshServices}
            />
        }
        data={medicalAssistantList}
        renderItem={renderMedicalAssistantList}
        // ListFooterComponent={renderLoaderMoreButton}
        keyExtractor={(item, index) => index.toString()}
      />
      {/* ) : null}
      </View> */}

        <Popup
          isVisible={isVisible}
          type={'medicalAssistant'}
          wait={'Please wait'}
          title={'Your request has been sent to the \n admin for the medical assistant \n service'}
          docImage={image}
          docName={assistantname}
          onPress={'Home'}
        />

        </View>
    )
}

const styles = StyleSheet.create({
    loadMoreContentContainer: {
        justifyContent: 'center',
        alignSelf: 'center',
        width: 120,
        marginVertical: 20,
    },
});

export default MedicalAssistant;