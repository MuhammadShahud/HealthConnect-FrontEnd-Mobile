import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  ActivityIndicator
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { Colors } from '../../Styles';
import { Header, Popup, Searchbar, SubmitButton } from '../../Components';
import { doctorImg, FemaleDoctorImg, MaleDoctorImg } from '../../Assets';
import { AirbnbRating } from 'react-native-ratings';
import { Item } from 'react-native-paper/lib/typescript/components/List/List';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import TeleHealthMiddleware from '../../Store/Middleware/TeleHealthMiddleware';
import { IMG_URL } from '../../Store/Apis';
const doctorsList = [
  { name: 'Dr. John Doe', speciality: 'Nurse', image: doctorImg },
  {
    name: 'Dr. Stella',
    speciality: 'Heart Surgen',
    image: FemaleDoctorImg,
    specialist: true,
  },
  { name: 'Dr. Wolf Heyman', speciality: 'Cardiologist', image: MaleDoctorImg },
  { name: 'Dr. John Doe', speciality: 'Psychologist', image: doctorImg },
  {
    name: 'Dr. Stella',
    speciality: 'Dermatologist',
    image: FemaleDoctorImg,
    specialist: true,
  },
  { name: 'Dr. Wolf Heyman', speciality: 'Cardiologist', image: MaleDoctorImg },
];
//////Comment Distance
const filtersList = ['Category', 'Rating', 'Experience'];

const Telehealth = () => {
  const [doctors, setDoctors] = useState(doctorsList);
  const [filters, setFilters] = useState(filtersList);
  const navigation = useNavigation();

  const TeleHealthState = useSelector(state => state.TeleHealthReducer);
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(true);
  const TeleHealthData = TeleHealthState?.TeleHealth;
  const TeleHealthDataList = TeleHealthState?.TeleHealth_list;
  const loading = TeleHealthState?.loading;
  const [isVisible, setIsVisible] = useState(false)
  const [popupType, setpopupType] = useState(null)


  // console.log('+++++', TeleHealthDataList[0]);

  useEffect(() => {
    dispatch(TeleHealthMiddleware.getTeleHealth({ name: '' }))
      .then((data) =>{ 
        data ? setLoader(false) : setLoader(false)
      })
      .catch(() => setLoader(false))
  }, []);

  const onPressLoadMore = () => {
    setLoader(true),
      dispatch(TeleHealthMiddleware.getTeleHealth({ next_page_url: TeleHealthData.next_page_url }))
        .then((data) => data ? setLoader(false) : setLoader(false))
        .catch(() => setLoader(false))
  };

  const renderLoaderMoreButton = () => {
    return TeleHealthData.next_page_url ? (
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
      dispatch(TeleHealthMiddleware.getTeleHealth({ name: '' }))
        .then((data) => data ? setLoader(false) : setLoader(false))
        .catch(() => setLoader(false));

  };
  const onChangeSearchText = text => {
    clearTimeout(searchTimeout)
    let searchTimeout = setTimeout(() => {
      dispatch(TeleHealthMiddleware.getTeleHealth({ name: text }))
    }, 1500)

  };


  const renderOneDoctor = ({ item }) => {
    // console.log('====>',item);
    return (
      <View style={styles.userContainer}>
        <View style={styles.userSubContainer}>
         { item?.provider ? 
          <Image source={
            item?.provider?.profile_pic
                ? { uri: IMG_URL + item?.provider?.profile_pic }
                : require('../../Assets/Images/avatar.png')
            } style={styles.userimage} />
          :
          <Image source={
            item?.profile_pic
              ? { uri: IMG_URL + item?.profile_pic }
              : require('../../Assets/Images/avatar.png')
          } style={styles.userimage} />          
          }

          <View style={{ flex: 1, paddingHorizontal: 10 }}>
            {item?.provider ? <Text style={styles.name}>
              {item?.provider?.username}{' '}
              {item?.provider?.specialist == 'Yes' ? (
                <Text
                  style={{
                    fontSize: 10,
                    fontWeight: 'bold',
                    color: Colors.LIGHT_GREEN,
                  }}>
                  Specialist
                </Text>
              ) : null}
            </Text> 
            :
            <Text style={styles.name}>
            {item?.username}{' '}
            {item?.specialist == 'Yes' ? (
              <Text
                style={{
                  fontSize: 10,
                  fontWeight: 'bold',
                  color: Colors.LIGHT_GREEN,
                }}>
                Specialist
              </Text>
            ) : null}
          </Text>
            }

            {item?.provider ? <Text style={styles.dateAgo}>{item?.provider?.type}</Text> : <Text style={styles.dateAgo}>{item?.type}</Text>}

            {item?.provider ? <View style={{ alignItems: 'flex-start' }}>
              <AirbnbRating
                showRating={false}
                count={5}
                isDisabled={true}
                defaultRating={item?.provider?.average_rating ? item?.provider?.average_rating : 0}
                size={10}
              />
            </View>
          :  
          <View style={{ alignItems: 'flex-start' }}>
              <AirbnbRating
                showRating={false}
                count={5}
                isDisabled={true}
                defaultRating={item?.average_rating ? item?.average_rating : 0}
                size={10}
              />
            </View>
          }
          </View>
        </View>
        {item?.provider ? <SubmitButton
          onPress={() => navigation.navigate('DoctorProfile', { item : item?.provider })}
          text={'Book Appointment'}
          buttonContainer={styles.buttonContainer}
          textStyle={{ fontSize: 11 }}
        /> 
      :
      <SubmitButton
          onPress={() => navigation.navigate('DoctorProfile', { item })}
          text={'Book Appointment'}
          buttonContainer={styles.buttonContainer}
          textStyle={{ fontSize: 11 }}
        />
      }
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={{ paddingHorizontal: 22 }}>
        <Header headerLeft={true} title={'Telehealth'} />
      </View>

      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          alignSelf: 'center',
          justifyContent: 'center',
          marginVertical: 8,
        }}>
        {filters.map(item => {
          return (
            <TouchableOpacity
            onPress={()=>{
              setIsVisible(true)
              setpopupType(item)
            }}
              style={{
                width:'30%',
                paddingVertical: 12,
                paddingHorizontal: 12,
                elevation: 1,
                borderWidth: 1,
                borderColor: Colors.BG_GRAY,
              }}>
              <Text style={{color: '#000', alignSelf: 'center'}}>{item}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <Searchbar onChangeText={onChangeSearchText} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
        {!TeleHealthData ? (
                            <ActivityIndicator
                                size={'large'}
                                color={'#1D9CD9'}
                                style={styles.loadMoreContentContainer}
                            />
        ) : null}
        {TeleHealthDataList && TeleHealthDataList?.length ? (
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={loader}
              onRefresh={onRefreshServices}
            />
          }
          data={TeleHealthDataList}
          renderItem={renderOneDoctor}
          ListFooterComponent={renderLoaderMoreButton}
          contentContainerStyle={{ width: '90%', alignSelf: 'center' }}
        />
        ) : null}
        </View>
      </ScrollView>

      <Popup
        isVisible={isVisible}
        type={popupType}
        onPress={value => setIsVisible(value)}
      />
    </View>
  );
};

export default Telehealth;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  userContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.BG_GRAY,
    paddingVertical: 10,
    marginVertical: 10,
  },
  userSubContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  userimage: {
    width: 50,
    height: 50,
    borderRadius: 100,
  },
  name: {
    fontSize: 16,
    color: Colors.BLACK,
    fontWeight: 'bold',
  },
  dateAgo: { fontSize: 12, color: Colors.LIGHT_GRAY_1, fontWeight: '300' },
  buttonContainer: {
    marginRight: 5,
    paddingVertical: 10,
    alignSelf: 'center',
    borderRadius: 12,
    backgroundColor: Colors.LIGHT_GREEN,
    width: 110,
  },
});
