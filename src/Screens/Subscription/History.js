import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, RefreshControl } from 'react-native';
import { style } from './style';
import { Colors } from '../../Styles';
import { useNavigation } from '@react-navigation/native';
import SubscriptionMiddleware from '../../Store/Middleware/SubscriptionMiddleware';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';

const historyArray = [
  {
    plan: 'Weekly Plan Basic',
    status: 'Expired',
    purchasedDate: 'Purchased on 02 February 2022',
    price: 50,
    valid: 'Per Week',
  },
  {
    plan: 'Weekly Plan Basic',
    status: 'Expire on',
    purchasedDate: 'Purchased on 10 February 2022',
    price: 50,
    valid: 'Per Week',
  },
];

const History = () => {
  const [history, setHistory] = useState([]);
  const navigation = useNavigation();
  const [loader, setLoader] = useState(true);
  const dispatch = useDispatch();

  useEffect(()=>{
    onRefreshServices()    
  },[])

  const onRefreshServices = () => {
    setLoader(true) 
    dispatch(SubscriptionMiddleware.getSubscriptionHistory())
            .then((data) =>{ 
              data ? setLoader(false) : setLoader(false)
              setHistory(data?.data)
              console.log(data?.data);
            })
            .catch(() => setLoader(false))

  }

  const renderHistory = ({ item }) => {
    //console.warn('dsada', item);
    return (
      <View style={style.historyCard}>
        <View style={{ paddingHorizontal: 14 }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={style.plan}>{item?.subscription?.package_name}</Text>

            {/* {item?.status.includes('on') ? (
              <Text style={{ color: Colors.WHITE, textAlign: 'right' }}>
                {item.status} {'\n'} 16 February 2022
              </Text>
            ) : (
              <Text style={{ color: Colors.WHITE }}>{item.status}</Text>
            )} */}
          </View>

          <Text style={{ color: Colors.WHITE }}>Purchased on {moment(item?.created_at).format('MM-DD-YYYY')}</Text>
        </View>

        <View style={[style.cardFooter, { marginVertical: 18 }]}>
          <View style={{ flex: 1 }}>
            <Text style={style.price}>${item?.subscription?.price}</Text>
          </View>

          {/* <TouchableOpacity
            onPress={() => navigation.navigate('PaymentCards',{item})}
            style={style.subscribeBtn}>
            <Text style={{ color: Colors.LIGHT_GREEN }}>Re-Subscribe</Text>
          </TouchableOpacity> */}
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
      data={history}
      renderItem={renderHistory}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

export default History;
