import {useNavigation} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, ActivityIndicator, RefreshControl} from 'react-native';
import {doctorImg, FemaleDoctorImg, MaleDoctorImg} from '../../Assets';
import { useDispatch } from 'react-redux';
import AppointmentListItem from './AppointmentList';
import AppMiddleware from '../../Store/Middleware/AppMiddleware';
import { IMG_URL } from '../../Store/Apis';

const Past = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [pastData, setPastData] = useState([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    onRefreshApi()
  }, []);
  
  const onRefreshApi = () => {

    dispatch(AppMiddleware.PastAppointments())
      .then((data) => {
        data ? setLoader(false) : setLoader(false)
        setPastData(data?.data)
      })
      .catch(() => setLoader(false))
  }

  const renderAppointments = ({item}) => {
    // console.log('CHECK_Conditions',item);
    return (
      <AppointmentListItem
        name={item?.doctor?.username}
        type={item?.doctor?.type}
        speciality={item?.doctor?.specialist}
        time={item?.time}
        date={item?.date}
        image={item?.doctor?.profile_pic ? {uri: IMG_URL + item?.doctor?.profile_pic} : require('../../Assets/Images/avatar.png')}
        buttonType={'past'}
        review={item?.isAbleToReview}
        isCancelled={item?.is_cancelled}
        isCompleted={item?.is_completed}
        onPress={() => console.warn('past onPress ===')}
        onPressCancel={() =>
          navigation.navigate('AppointmentDetail', {
            screen: 'past',
            item,
          })
        }
      />
    );
  };
  return <FlatList 
  refreshControl={
    <RefreshControl
        refreshing={loader}
        onRefresh={onRefreshApi}
    />
    }
  data={pastData} 
  renderItem={renderAppointments}
  keyExtractor={(item, index) => index.toString()}
  />;
};

export default Past;
