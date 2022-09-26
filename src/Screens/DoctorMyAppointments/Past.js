import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { FlatList, TouchableOpacity, ActivityIndicator, RefreshControl, Text, StyleSheet } from 'react-native';
import { doctorImg, FemaleDoctorImg, MaleDoctorImg } from '../../Assets';
import { UpCommingAppointments } from '../../Components';
import DoctorAppointmentMiddleware from '../../Store/Middleware/DoctorAppointmentMiddleware';
import { useDispatch, useSelector } from 'react-redux';
import { Colors } from '../../Styles';


const past = [
  {
    name: 'Dr. John Doe',
    speciality: 'Nurse',
    date: '9:00 AM | 10th Feb 22',
    phone: '123 456 7908',
    age: 29,
    experience: 3,
    image: doctorImg,
  },
  {
    name: 'Dr. Wolf Heyman',
    speciality: 'Physio Therapist',
    date: '9:00 AM | 10th Feb 22',
    phone: '123 456 7908',
    age: 29,
    experience: 3,
    image: MaleDoctorImg,
  },
  {
    name: 'Dr. Stacy Doe',
    speciality: 'Nurse',
    date: '9:00 AM | 10th Feb 22',
    phone: '123 456 7908',
    age: 29,
    experience: 3,
    image: FemaleDoctorImg,
  },
  {
    name: 'Dr. Steve Buckner',
    speciality: 'Physio Therapist',
    date: '9:00 AM | 10th Feb 22',
    phone: '123 456 7908',
    age: 29,
    experience: 3,
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

const Past = props => {

  const [appointments, setAppointments] = useState(past);
  const navigation = useNavigation();
  const [loader, setLoader] = useState(true);
  const dispatch = useDispatch();
  const DoctorAppointmentState = useSelector(state => state.DoctorAppointmentReducer);
  const DoctorAppointmentData = DoctorAppointmentState?.doctorpastappointment;
  const DoctorAppointmentDataList = DoctorAppointmentState?.doctorpastappointment_list;
  const loading = DoctorAppointmentState?.loading;

  useEffect(() => {
    onRefreshServices()
  }, [])


  const onPressLoadMore = () => {
    setLoader(true),
      dispatch(DoctorAppointmentMiddleware.getDoctorPastAppointment({ next_page_url: DoctorAppointmentData.next_page_url }))
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
          style={{ width: 110, alignSelf: 'center', marginVertical: 15, backgroundColor: Colors.LIGHT_GREEN, borderRadius: 5 }}
          onPress={onPressLoadMore}>
          <View style={{ alignSelf: 'center' }}>
            <Text style={{ color: '#fff', padding: 5, }}>Load more</Text>
          </View>
        </TouchableOpacity>
      )
    ) : null;
  };

  const onRefreshServices = () => {
    setLoader(true),
      dispatch(DoctorAppointmentMiddleware.getDoctorPastAppointment({ name: '' }))
        .then((data) => data ? setLoader(false) : setLoader(false))
        .catch(() => setLoader(false));

  };

  const renderAppointments = ({ item }) => {
    console.log('past', item);
    return (
      <UpCommingAppointments
        item={item}
        disable={true}
        past={true}
      // onPress={() => {
      //   navigation.navigate('AppointmentRequestDetail', {
      //     isAppointmentAccepted: true,
      //     item: item
      //   })
      // }}
      />
    );
  };

  return (
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
  )
};

const styles = StyleSheet.create({
  loadMoreContentContainer: {
    justifyContent: 'center',
    alignSelf: 'center',
    width: 120,
    marginVertical: 20,
  },
});

export default Past;
