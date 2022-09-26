import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, RefreshControl } from 'react-native';
import { style } from './style';
import { Colors } from '../../Styles';
import { useNavigation } from '@react-navigation/native';
import SubscriptionMiddleware from '../../Store/Middleware/SubscriptionMiddleware';
import { useDispatch, useSelector } from 'react-redux';

const packagesArray = [
  {
    title: 'Basic',
    plan: 'Weekly Plan',
    availableAppointments: '5 Doctor Appointments',
    days: 'Free Consult with any doctor for seven days',
    price: 50,
    valid: 'Per Week',
  },
  {
    title: 'Premium',
    plan: 'Monthly Plan',
    availableAppointments: '10 Doctor Appointments',
    days: 'Free Consult with any doctor for 30 days',
    price: 100,
    valid: 'Per Month',
  },
  {
    title: 'Family',
    plan: 'Family Subscription',
    availableAppointments: 'Can Add upto 4 Family Members',
    days: 'Unlimited Doctor Appointments',
    price: 500,
    valid: 'Per Month',
  },
];

const Packages = () => {

  
  const AuthState = useSelector(state => state.AuthReducer);
  const [packages, setPackages] = useState([]);
  const navigation = useNavigation();
  const [loader, setLoader] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    onRefreshServices()
  }, [])

  // console.log('++++ done',AuthState?.user?.user?.subscription);

  const onRefreshServices = () => {
    setLoader(true)
    dispatch(SubscriptionMiddleware.getSubscription())
            .then((data) =>{ 
              data ? setLoader(false) : setLoader(false)
              setPackages(data?.data)
            })
            .catch(() => setLoader(false))

  };

  const renderPackages = ({ item }) => {
    // console.log('dsada', item);
    return (
      <View style={style.cardContainer}>
        <View style={style.titleContainer}>
          <Text style={style.title}>{item?.package_name}</Text>
        </View>

        <View style={style.cardBody}>
          <View
            style={{ width: '100%', height: 1, backgroundColor: Colors.WHITE }}
          />

          <View style={{ paddingHorizontal: 14, paddingVertical: 14 }}>
            <Text style={style.plan}>{item.plan}</Text>

            <Text style={{ color: Colors.WHITE }}>
              {item.description}
            </Text>

            <Text style={{ color: Colors.WHITE }}>{item.days}</Text>
          </View>

          <View style={style.cardFooter}>
            <View style={{ flex: 1 }}>
              <Text style={style.price}>${item.price}</Text>

              <Text style={{ color: Colors.WHITE }}>{item.valid}</Text>
            </View>

            {item?.is_subscribed ? <TouchableOpacity
            disabled={true}
            style={style.subscribedBtn}>
            <Text style={{ color: Colors.WHITE }}>Subscribed</Text>
          </TouchableOpacity> : 
            <TouchableOpacity
            onPress={() => navigation.navigate('PaymentCards',{item})}
            style={style.subscribeBtn}>
            <Text style={{ color: Colors.LIGHT_GREEN }}>Subscribe</Text>
          </TouchableOpacity>
            
            }
          </View>
        </View>
      </View>
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
      data={packages}
      renderItem={renderPackages}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

export default Packages;
