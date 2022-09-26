import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ScrollView,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  RefreshControl
} from 'react-native';
import {
  CardioIcon,
  DoctorIcon,
  FemaleDoctorImg,
  HealthIcon,
  HospitalIcon,
  MaleDoctorImg,
  MedicineIcon,
  TransportationIcon,
  medical_team,
  VaccineIcon,
  calendar_green,
  carOne,
  carTwo,
  carThree,
  carFour,
  pharmacyOne,
  pharmacyTwo,
  pharmacyThree,
  pharmacyFour,
  cardioOne,
  cardioTwo,
  cardioThree,
  cardioFour,
  transportaion_1,
  transportaion_2,
  pharmacy_1,
  pharmacy_2,
  lab_1,
  lab_2,
  profileImg,
} from '../../Assets';
import {
  Header,
  Searchbar,
  CategoryItem,
  DoctorItem,
  AppointmentRequest,
  UpCommingAppointments,
} from '../../Components';
import DoctorMiddleware from '../../Store/Middleware/DoctorMiddleware';
import { Colors } from '../../Styles';
import { style } from './style';
import { useDispatch, useSelector } from 'react-redux';
import DoctorAction from '../../Store/Actions/DoctorAction';
import messaging from '@react-native-firebase/messaging';

const transportationList = [
  { name: 'Ambulance Service', image: carOne, number: 2 },
  { name: `Patient's Transportation`, image: carTwo, number: 4 },
  { name: 'Ambulance', image: carThree, number: 7 },
  { name: 'NY Ambulance Service', image: carFour, number: 8 },
  { name: '24/7 Amb', image: transportaion_1, number: 10 },
  { name: 'Health Care Vehicles', image: transportaion_2, number: 5 },
];

const pharmacyList = [
  { name: 'ABC Hospital', image: pharmacyOne, number: 2 },
  { name: 'NY Clinic', image: pharmacyTwo, number: 4 },
  { name: 'Standard Hospital', image: pharmacyThree, number: 7 },
  { name: 'Child Hospital', image: pharmacyFour, number: 8 },
  { name: 'LA Clinic', image: pharmacy_1, number: 10 },
  { name: 'Hospital Care', image: pharmacy_2, number: 5 },
];

const laboratoryList = [
  { name: 'ABC Laboratory', image: cardioOne, number: 2 },
  { name: 'NY Lab', image: cardioTwo, number: 5 },
  { name: 'Laboratory Inc', image: cardioThree, number: 1 },
  { name: 'Specialized Lab', image: cardioFour, number: 9 },
  { name: 'New NY Lab', image: lab_1, number: 3 },
  { name: 'Sidney Lab', image: lab_2, number: 12 },
];

const DoctorDashboard = () => {

  const categories = [
    {
      headerTitle: 'Pharmacy',
      name: 'Pharmacy',
      image: VaccineIcon,
    },
    {
      headerTitle: 'Laboratory',
      name: 'Laboratory',
      image: CardioIcon,
    },
    {
      headerTitle: 'Medical Assistant',
      name: 'Medical Assistant',
      image: medical_team,
      onPress: () =>
        navigation.navigate('MedicalAssistant', {
          item: { name: 'Medical Assistant', isFromDoctorDashboard: true },
        }),
    },
    {
      headerTitle: 'Transportation',
      name: 'Transportation',
      image: TransportationIcon,
    },
  ];

  const [categoriesArray, setCategoriesArray] = useState(categories);
  const AuthState = useSelector(state => state.AuthReducer);
  const [transports, setTransport] = useState(transportationList);
  const [pharmacy, setPharmacy] = useState(pharmacyList);
  const [lab, setLab] = useState(laboratoryList);
  const navigation = useNavigation();
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(true);
  const AppointmentState = useSelector(state => state.DoctorReducer);
  const AppointmentData = AppointmentState?.DoctorAppointment;
  const AppointmentDataList = AppointmentState?.DoctorAppointment_list;
  const loading = AppointmentState?.loading;
  const [latestRequest, setlatestRequest] = useState(null)

  useEffect(() => {
    messaging().getInitialNotification().then(message => {
      if (message.notification.title.includes('Incoming'))
        navigation.navigate('IncomingCall')
    })
    messaging().onMessage(onMessageReceived)
    onRefreshServices()
    // onLatestRequest()
  }, [])
  async function onMessageReceived(message) {
    if (message.notification.title.includes('Incoming'))
      navigation.navigate('IncomingCall', { data: message.data })
    if (message.notification.title.includes("Call Declined"))
      navigation.navigate("Dashboard")
  }

  // const onLatestRequest = () => {
  //   setLoader(true) 
  //   dispatch(DoctorMiddleware.getLatestAppoinmentRequest())
  //           .then((data) => {
  //             if(data?.data){
  //               data ? setLoader(false) : setLoader(false)
  //               setlatestRequest(data)
  //             }
  //             else{
  //               data ? setLoader(false) : setLoader(false)
  //             } 
  //           })
  //           .catch(() => setLoader(false))

  // };

  const onPressLoadMore = () => {
    setLoader(true),
      dispatch(DoctorMiddleware.getDoctorAppointment({ next_page_url: AppointmentData.next_page_url, name: 'loadmore' }))
        .then((data) => data ? setLoader(false) : setLoader(false))
        .catch(() => setLoader(false))
  };

  const renderLoaderMoreButton = () => {
    return AppointmentData.next_page_url ? (
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
    setLoader(true)
    dispatch(DoctorMiddleware.getDoctorAppointment({ name: '' }))
      .then((data) => data ? setLoader(false) : setLoader(false))
      .catch(() => setLoader(false))

  };


  const onScrollToRefresh = () => {
    onRefreshServices()
    // onLatestRequest()
  }


  // const onChangeSearchText = text => {
  //     clearTimeout(searchTimeout)
  // let searchTimeout = setTimeout(() => {
  //         console.log(search, text, 'TEXT====>');
  //         dispatch(DoctorMiddleware.getDoctorUpcomingAppointment({ name: text }))
  //     }, 1000)

// const onChangeSearchText = text => {
//     clearTimeout(searchTimeout)
// let searchTimeout = setTimeout(() => {
//         console.log(search, text, 'TEXT====>');
//         dispatch(DoctorMiddleware.getDoctorUpcomingAppointment({ name: text }))
//     }, 1500)


  const renderCategories = ({ item }) => {
    // console.log('ITEM--->', item.image);
    return (
      <CategoryItem
        name={item?.name}
        image={item.image}
        onPress={() => {
          item.onPress
            ? item.onPress()
            : navigation.navigate(
              item.name.includes('Pharmacy')
                ? 'Pharmacies'
                :
                item.name.includes('Transportation')
                  ? 'Transportation'
                  :
                  item.name.includes('Laboratory')
                    ? 'Laboratory'
                    : 'CategoryListing',
              {
                headerTitle: item.headerTitle,
                data:
                  item.name == 'Pharmacy'
                    ? pharmacy
                    : item.name == 'Laboratory'
                      ? lab
                      : item.name == 'Transportation'
                        ? transports
                        : [],
              },
            );
        }}
        style={{ width: '46%' }}
      />
    );
  };

  const renderAppointmentCard = ({ item }) => {
    // console.log('-------', item);
    return (
      <UpCommingAppointments
        item={item}
        onPress={() =>
          navigation.navigate('AppointmentRequestDetail', {
            isAppointmentAccepted: true,
            item: item
          })
        }
      />
    );
  };

  return (
    <View style={style.container}>
      <View style={{ paddingHorizontal: 18 }}>
        <Header title={'Welcome'} />
        <View style={{ marginBottom: 13 }}>
          <Text style={style.categoryText}>{AuthState?.user?.user?.username}</Text>
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={loader}
            onRefresh={() => {
              onScrollToRefresh()
            }}
          />
        }
      >
        {/* <Searchbar value={search} onChangeText={text => setSearch(text)} /> */}

        <View style={style.categoryContainer}>
          <Text style={style.categoryText}>Categories</Text>
          <FlatList
            numColumns={2}
            data={categoriesArray}
            renderItem={renderCategories}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
        {/* {
        latestRequest ?  <AppointmentRequest
          item={latestRequest?.data}
          onPress={() => {
            navigation.navigate('AppointmentRequestDetail', {
              isAppointmentAccepted: !true,
              item: latestRequest?.data
            })
          }

          }
        />
        : null
        } */}
        <View
          style={[
            style.categoryContainer,
            {
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginVertical: 10,
            },
          ]}>
          <Text style={style.categoryText}>Accepted Appointments</Text>
          {/* {
        latestRequest ?  
          <Text
            style={{ fontSize: 12, fontWeight: 'bold' }}
            onPress={() => navigation.navigate('Appointments')}>
            See all
          </Text>
          : null
        } */}
        </View>
        <View>
          {!AppointmentData ? (
            <ActivityIndicator
              size={'large'}
              color={'#1D9CD9'}
              style={styles.loadMoreContentContainer}
            />
          ) : null}
          {AppointmentDataList && AppointmentDataList?.length ? (
            <FlatList
              data={AppointmentDataList}
              renderItem={renderAppointmentCard}
              ListFooterComponent={renderLoaderMoreButton}
              keyExtractor={(item, index) => index.toString()}
            />
          ) :
            <View style={{ alignItems: 'center', marginTop: 10 }}>
              <Text style={{ color: '#000' }}>No Accepted Appointments Found</Text>
            </View>
          }
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    // marginHorizontal: 18,
  },
  headerTitle: {
    fontSize: 20,
    color: Colors.BLACK,
    fontWeight: 'bold',
  },
  loadMoreContentContainer: {
    justifyContent: 'center',
    alignSelf: 'center',
    width: 120,
    marginVertical: 20,
  },
});
export default DoctorDashboard;
