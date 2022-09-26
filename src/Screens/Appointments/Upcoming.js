import React, { useEffect, useState } from 'react';
import { FlatList, ActivityIndicator, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { doctorImg, FemaleDoctorImg, MaleDoctorImg } from '../../Assets';
import AppointmentListItem from './AppointmentList';
import { useDispatch } from 'react-redux';
import AppMiddleware from '../../Store/Middleware/AppMiddleware';
import { IMG_URL } from '../../Store/Apis';

const Upcoming = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [UpcomingData, setUpcomingData] = useState([]);
  const [loader, setLoader] = useState(true);


  useEffect(() => {
    // const unsubscribe = navigation.addListener('focus', () => {
    onRefreshApi()
    // });
    // return unsubscribe;

  }, []);

  const onRefreshApi = () => {
    setLoader(true)
    dispatch(AppMiddleware.UpcomingAppointments())
      .then((data) => {
        data ? setLoader(false) : setLoader(false)
        setUpcomingData(data?.data)
      })
      .catch(() => setLoader(false))
  }

  const renderAppointments = ({ item }) => {
    // console.warn("Upcoming",item);
    return (
      <AppointmentListItem
        name={item?.doctor?.username}
        type={item?.doctor?.type}
        speciality={item?.doctor?.specialist}
        date={item.date}
        time={item?.time}
        image={item?.doctor?.profile_pic ? { uri: IMG_URL + item?.doctor?.profile_pic } : require('../../Assets/Images/avatar.png')}
        buttonType={'upcoming'}
        isCancelled={item?.is_cancelled}
        onPressCancel={() =>
          navigation.navigate('AppointmentDetail', {
            screen: 'upcoming',
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
                data={UpcomingData}
                renderItem={renderAppointments}
                keyExtractor={(item, index) => index.toString()}
            />;
};

export default Upcoming;
