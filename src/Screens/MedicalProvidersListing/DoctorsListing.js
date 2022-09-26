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


const DoctorsListing = props => {

  const [isVisible, setIsVisible] = useState(false);
  const [isShowDoctorModal, setIsShowDoctorModal] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const AuthState = useSelector(state => state.AuthReducer);
  const [loader, setLoader] = useState(true);
  const DoctorState = useSelector(state => state.DoctorReducer);
  const DoctorData = DoctorState?.Doctor;
  const DoctorDataList = DoctorState?.Doctor_list;
  const {name, isFromDoctorDashboard} = props.route.params?.item;

  // console.log('---', DoctorDataList);


  useEffect(()=>{
    setLoader(true)
    dispatch(DoctorMiddleware.getDoctor({ name: '' }, props.route.params?.item?.service_id))
            .then((data) => data ? setLoader(false) : setLoader(false))
            .catch(() => setLoader(false))    
  },[])



  const onPressLoadMore = () => {
    setLoader(true),
        dispatch(DoctorMiddleware.getDoctor({ next_page_url: DoctorData.next_page_url }, props.route.params?.item?.service_id))
            .then((data) => data ? setLoader(false) : setLoader(false))
            .catch(() => setLoader(false))
};


const renderLoadMoreButton = () => {
    return DoctorData.next_page_url ? (
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
                <View style={{alignSelf: 'center'}}>
                <Text style={{color: '#fff', padding: 5,}}>Load more</Text>
                </View>
            </TouchableOpacity>
        )
    ) : null;
};


const onRefreshDoctor = () => {
  setLoader(true),
      dispatch(DoctorMiddleware.getDoctor({ name: '' }, props.route.params?.item?.service_id))
          .then((data) => data ? setLoader(false) : setLoader(false))
          .catch(() => setLoader(false));

};


const onChangeSearchText = text => { 
  clearTimeout(searchTimeout)
  let searchTimeout = setTimeout(() => {
    // console.log(search, text, 'TEXT====>');
    dispatch(DoctorMiddleware.getDoctor({ name: text }, props.route.params?.item?.service_id));
}, 1500)

};

  const renderDoctorList = ({item}) => {
    return (
      <TouchableOpacity
        disabled={AuthState.userRole === 'patient' ? true : false}
        onPress={() => setIsShowDoctorModal(true)}
        style={style.listContainer}>
        {item?.provider ? 
        <Image source={item?.provider?.profile_pic ? {uri: IMG_URL + item?.provider?.profile_pic} : require('../../Assets/Images/avatar.png')} style={style.image} />
        : 
        <Image source={item?.profile_pic ? {uri: IMG_URL + item?.profile_pic} : require('../../Assets/Images/avatar.png')} style={style.image} />
        }
        <View style={{flex: 1, paddingHorizontal: 10}}>
          {item?.provider ? <Text style={style.name}>{item?.provider?.username}</Text> : <Text style={style.name}>{item?.username}</Text>}

          <Text style={{paddingVertical: 2, color: '#000'}}>
            {name}{' '}
            {item?.provider?.specialist == 'Yes' ? (
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: 'bold',
                  color: Colors.LIGHT_GREEN,
                }}>
                {!isFromDoctorDashboard && `(Specialist)`}
              </Text>
            ) : null}
          </Text>

          {!isFromDoctorDashboard && (
            <View style={{alignItems: 'flex-start'}}>
              {
                item?.provider ?
                <AirbnbRating size={13} defaultRating={item?.provider?.average_rating ? item?.provider?.average_rating : 0 } showRating={false} isDisabled={true} />
               :
               <AirbnbRating size={13} defaultRating={item?.average_rating ? item?.average_rating : 0 } showRating={false} isDisabled={true} />
              }
            </View>
          )}
        </View>

        <TouchableOpacity
          onPress={() => {
            AuthState.userRole !== 'patient'
              ? setIsShowDoctorModal(true)
              : navigation.navigate('DoctorProfile', {item : item?.provider} );
          }}
          style={style.cancelButton}>
          <Text style={style.buttonText}>
            {isFromDoctorDashboard ? 'Request' : 'Book Appointment' }
          </Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };
  return (
    <View style={style.container}>
      <View style={{paddingHorizontal: 22}}>
        <Header headerLeft={true} title={props.route.params?.item?.sub_service_name} />
      </View>

      {/* {DoctorDataList && DoctorDataList?.length ? ( */}
      <View
        style={{
          width: isFromDoctorDashboard ? '100%' : '90%',
          alignSelf: 'center',
          flexDirection: 'row',
          justifyContent: !isFromDoctorDashboard ? 'space-between' : 'center',
        }}>
        <Searchbar onChangeText={onChangeSearchText}/>

        {!isFromDoctorDashboard && (
          <TouchableOpacity
            onPress={() => setIsVisible(true)}
            style={{
              backgroundColor: Colors.LIGHT_GREEN,
              paddingHorizontal: 6,
              justifyContent: 'center',
              borderRadius: 3,
              marginLeft :3
            }}>
            <Image
              source={FilterIcon}
              style={{width: 22, height: 22}}
              resizeMode={'contain'}
            />
          </TouchableOpacity>
        )}
      </View>
      {/* // ) : null} */}

      {!DoctorData ? (
          <ActivityIndicator
            size={'large'}
            color={'#1D9CD9'}
            style={styles.loadMoreContentContainer}
          />
      ) : null}
      {DoctorDataList && DoctorDataList?.length ? (
      <FlatList
        refreshControl={
        <RefreshControl
                refreshing={loader}
                onRefresh={onRefreshDoctor}
            />
        }
        data={DoctorDataList}
        renderItem={renderDoctorList}
        ListFooterComponent={renderLoadMoreButton}
        keyExtractor={(item, index) => index.toString()}
      />
      ) : <Text style={{color: 'black', fontSize: 14, alignSelf: 'center'}}>No Doctor Found</Text>}

      <Popup
        isVisible={isVisible}
        type={'filter'}
        id={props.route.params?.item?.service_id}
        onPress={value => setIsVisible(value)}
      />
      <Popup
        isVisible={isShowDoctorModal}
        type={'doctor_detail'}
        onPress={value => setIsShowDoctorModal(false)}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  loadMoreContentContainer: {
      justifyContent: 'center',
      alignSelf: 'center',
      width: 120,
      marginVertical: 20,
  },
});

export default DoctorsListing;
