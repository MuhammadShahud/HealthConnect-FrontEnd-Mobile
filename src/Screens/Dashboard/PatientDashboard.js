import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import {
  cardioFour,
  CardioIcon,
  cardioOne,
  cardioThree,
  cardioTwo,
  carFour,
  carOne,
  carThree,
  carTwo,
  DoctorIcon,
  FemaleDoctorImg,
  HealthIcon,
  HospitalIcon,
  lab_1,
  lab_2,
  MaleDoctorImg,
  MedicineIcon,
  pharmacyFour,
  pharmacyOne,
  pharmacyThree,
  pharmacyTwo,
  pharmacy_1,
  pharmacy_2,
  private_clinic_1,
  private_clinic_2,
  private_clinic_3,
  private_clinic_4,
  private_clinic_5,
  private_clinic_6,
  transportaion_1,
  transportaion_2,
  TransportationIcon,
  VaccineIcon,
  medical_provider
} from '../../Assets';
import { CategoryItem, DoctorItem, Header, Searchbar } from '../../Components';
import { IMG_URL } from '../../Store/Apis';
import DoctorMiddleware from '../../Store/Middleware/DoctorMiddleware';
import ServiceMiddleware from '../../Store/Middleware/ServiceMiddleware';
import { style } from './style';
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
const hospitallist = [
  { name: 'Abc Hospital', image: private_clinic_1, number: 1 },
  { name: 'Child Hospital', image: private_clinic_2, number: 3 },
  { name: 'NY Clinic', image: private_clinic_3, number: 6 },
  { name: 'Standard Hospital', image: private_clinic_4, number: 9 },
  { name: 'Hospital Care', image: private_clinic_5, number: 3 },
  { name: 'LA Clinic', image: private_clinic_6, number: 5 },
];

const PatientDashboard = () => {
  const AuthState = useSelector(state => state.AuthReducer);
  const [transports, setTransport] = useState(transportationList);
  const [pharmacy, setPharmacy] = useState(pharmacyList);
  const [lab, setLab] = useState(laboratoryList);
  const [hospital, sethospital] = useState(hospitallist);
  const navigation = useNavigation();
  const ServiceState = useSelector(state => state.ServiceReducer);
  const dispatch = useDispatch();

  const [search, setSearch] = useState('');

  const servicesData = ServiceState.services;
  const servicesDataList = ServiceState.services_list;

  const categories = [
    {
      headerTitle: 'Medical Providers',
      name: 'Medical Providers',
      image: medical_provider,
    },
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
      headerTitle: 'Transportation',
      name: 'Transportation',
      image: TransportationIcon,
    },
    {
      headerTitle: 'Visiting Nurse',
      name: 'Visiting Nurse',
      image: DoctorIcon,
      onPress: () => navigation.navigate('VisitingNurses'),
    },
    {
      headerTitle: 'Telehealth',
      name: 'Telehealth',
      image: HealthIcon,
      onPress: () => navigation.navigate('Telehealth'),
    },
    {
      headerTitle: 'Private Clinic',
      name: 'Hospital/Clinics',
      image: HospitalIcon,

    },
  ];

  const [categoriesArray, setCategoriesArray] = useState(categories);
  const [doctorsArray, setdoctorsArray] = useState([]);

  async function onMessageReceived(message) {
    console.warn("MEG1:", message);
    if (message.notification.title.includes('Incoming'))
      navigation.navigate('IncomingCall', { data: message.data })
  }

  useEffect(() => {
    messaging().getInitialNotification().then(message => {
      console.warn("MEG:", message);
      if (message.notification.title.includes('Incoming'))
        navigation.navigate('IncomingCall', { data: message.data })
      if (message.notification.title.includes("Call Declined"))
        navigation.navigate("Dashboard")
    })
    messaging().onMessage(onMessageReceived)
    dispatch(ServiceMiddleware.getServices({ name: '' }));
    dispatch(DoctorMiddleware.getPopularDoctor())
      .then(data => {
        console.log('======', data);
        setdoctorsArray(data)
      })
      .catch((err) => {
        console.log(err);
      })
  }, []);


  const renderCategories = ({ item }) => {
    return (
      <CategoryItem
        name={item?.name}
        // image={{uri: IMG_URL+item.image}}
        image={item.image}
        onPress={() => {
          item.onPress
            ? item.onPress()
            : navigation.navigate(
              item.name.includes('Medical')
                ? 'MedicalProviders'
                :
                item.name.includes('Pharmacy')
                  ? 'Pharmacies'
                  :
                  item.name.includes('Transportation')
                    ? 'Transportation'
                    :
                    item.name.includes('Hospital/Clinics')
                      ? 'Clinic'
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
                      : [],
              },
            );
        }}
      />
    );
  };

  const renderDoctors = ({ item }) => {
    // console.log(item);
    return (
      <DoctorItem
        name={item?.username}
        image={item?.profile_pic ? { uri: IMG_URL + item?.profile_pic } : require('../../Assets/Images/avatar.png')}
        type={item?.type}
        speciality={item?.specialist}
        onPress={() => navigation.navigate('DoctorProfile', { item })}
      />
    );
  };

  return (
    <View style={style.container}>
      <View style={{ paddingHorizontal: 18 }}>
        <Header title={'Welcome ' + AuthState?.user?.user?.username} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* <Searchbar value={search} onChangeText={text => setSearch(text)} /> */}

        <View style={style.categoryContainer}>
          <Text style={style.categoryText}>Categories</Text>

          <FlatList
            numColumns={3}
            data={categories}
            renderItem={renderCategories}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>

        <View style={style.categoryContainer}>
          <Text style={style.categoryText}>Popular Doctors</Text>
        </View>

        {doctorsArray.length != 0 ? <FlatList
          data={doctorsArray}
          renderItem={renderDoctors}
          keyExtractor={(item, index) => index.toString()}
        /> :
          <Text style={{ color: '#000', textAlign: 'center', alignSelf: 'center', paddingTop: 10 }}>No Popular Doctor</Text>
        }
      </ScrollView>
    </View>
  );
};

export default PatientDashboard;
