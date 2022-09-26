import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { FlatList, TouchableOpacity, ActivityIndicator, RefreshControl, Text, StyleSheet, Alert} from 'react-native';
import { doctorImg, FemaleDoctorImg, MaleDoctorImg } from '../../Assets';
import { AppointmentRequest } from '../../Components';
import DoctorAppointmentMiddleware from '../../Store/Middleware/DoctorAppointmentMiddleware';
import { useDispatch, useSelector } from 'react-redux';
import { IMG_URL } from '../../Store/Apis';

const upcoming = [
  {
    name: 'Dr. John Doe',
    speciality: 'Nurse',
    date: '9:00 AM | 10th Feb 22',
    phone: '123 456 7890',
    age: 26,
    experience: 5,
    image: doctorImg,
  },
  {
    name: 'Dr. Wolf Heyman',
    speciality: 'Physio Therapist',
    date: '9:00 AM | 10th Feb 22',
    phone: '123 456 7080',
    age: 27,
    experience: 4,
    image: MaleDoctorImg,
  },
  {
    name: 'Dr. Stacy Doe',
    speciality: 'Nurse',
    date: '9:00 AM | 10th Feb 22',
    phone: '123 432 7592',
    age: 30,
    experience: 5,
    image: FemaleDoctorImg,
  },
  {
    name: 'Dr. Steve Buckner',
    speciality: 'Physio Therapist',
    date: '9:00 AM | 10th Feb 22',
    phone: '123 456 7890',
    age: 25,
    experience: 7,
    image: doctorImg,
  },
  {
    name: 'Dr. Fred Mask',
    speciality: 'Nurse',
    date: '9:00 AM | 10th Feb 22',
    phone: '123 456 7908',
    age: 29,
    experience: 3,
    image: MaleDoctorImg,
  },
];

const Upcoming = () => {

    const [appointments, setAppointments] = useState(upcoming);
    const navigation = useNavigation();
    const [loader, setLoader] = useState(true);
    const dispatch = useDispatch();
    const DoctorAppointmentState = useSelector(state => state.DoctorAppointmentReducer);
    const DoctorAppointmentData = DoctorAppointmentState?.doctorupcomingappointment;
    const DoctorAppointmentDataList = DoctorAppointmentState?.doctorupcomingappointment_list;
    const loading = DoctorAppointmentState?.loading;


    useEffect(()=>{
      onRefreshServices()
    },[])


    const onPressLoadMore = () => {
      setLoader(true),
          dispatch(DoctorAppointmentMiddleware.getDoctorUpcomingAppointment({ next_page_url: DoctorAppointmentData.next_page_url }))
              .then((data) => data ? setLoader(false) : setLoader(false))
              .catch(() => setLoader(false))
  };


  const renderLoaderMoreButton = () => {
      return DoctorAppointmentData.next_page_url ? (
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
          dispatch(DoctorAppointmentMiddleware.getDoctorUpcomingAppointment({ name: '' }))
              .then((data) => data ? setLoader(false) : setLoader(false))
              .catch(() => setLoader(false));

  };

  
  const onPressAcceptAppointment = (id) => {
    console.log(id);
    dispatch(DoctorAppointmentMiddleware.AcceptAppointment(id))
    .then((data) => {
        // console.log('----',data);
        if(data?.success){
          Alert.alert('Note',data?.message);     
            onRefreshServices();         
        }
        else{
          Alert.alert('Note',data?.message);
        } 
      })
      .catch(() => setLoader(false))
    }


    const onPressDeclineAppointment = (id) => {
      console.log(id);
      dispatch(DoctorAppointmentMiddleware.DeclineAppointment(id))
      .then((data) => {
          console.log('----',data);
          if(data?.success){
            Alert.alert('Note',data?.message);     
              onRefreshServices();         
          }
          else{
            Alert.alert('Note',data?.message);
          } 
        })
        .catch(() => setLoader(false))
      }


  const renderAppointments = ({ item }) => {
    // console.log(item);
    return (
      <AppointmentRequest
        item={item}
        onPressAccept={(id)=> onPressAcceptAppointment(id)}
        onPressDecline={(id)=> onPressDeclineAppointment(id)}
        onPress={() => navigation.navigate('AppointmentRequestDetail', {
          isAppointmentAccepted: false,
          item: item
        })}

      />
    );
  };
  return(
  
         <FlatList
            refreshControl={
          <RefreshControl
            refreshing={loader}
            onRefresh={onRefreshServices}
          />
          }
        data={DoctorAppointmentDataList}
        renderItem={renderAppointments}
        // ListFooterComponent={renderLoaderMoreButton}
        keyExtractor={(item, index) => index.toString()}
        />
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

export default Upcoming;
