import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, Alert, RefreshControl } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { style } from './style';
import { Colors } from '../../Styles';
import { MasterIcon, visaIcon } from '../../Assets';
import { Header } from '../../Components';
import PaymentCardMiddleware from '../../Store/Middleware/PaymentCardMiddleware';
import { useDispatch, useSelector } from 'react-redux';
import PaymentCardAction from '../../Store/Actions/PaymentCardAction';
import SubscriptionMiddleware from '../../Store/Middleware/SubscriptionMiddleware';

const paymentsCards = [
  { id: 1, name: 'master' },
  { id: 2, name: 'visa' },
];

const PaymentCards = props => {

  const AuthState = useSelector(state => state.AuthReducer);
  const [cards, setCards] = useState(paymentsCards);
  const [selectedCardId, setSelectedCardId] = useState(1);
  const navigation = useNavigation();
  const [loader, setLoader] = useState(true);

  const PaymentCardState = useSelector(state => state.PaymentCardReducer);
  const PaymentCardData = PaymentCardState?.paymentcard;
  const PaymentCardList = PaymentCardState?.paymentcard_list;

  const dispatch = useDispatch();

  let isSpecialist = props?.route?.params?.docInfo?.specialist;
  let review = props?.route?.params;

  // console.log('++++',PaymentCardList);

  useEffect(()=>{
    onRefreshServices()    
  },[])

  const onRefreshServices = () => {

    setLoader(true)
    dispatch(PaymentCardMiddleware.getPaymentCard())
    .then((data) =>data ? setLoader(false) : setLoader(false))
    .catch(() => setLoader(false))

  }


  const updateDefaultCard = (id,index) => {
    dispatch(PaymentCardAction.updateDefaultCard(index))
    dispatch(PaymentCardMiddleware.updatePaymentCard(id))
    .then((data)=>{
    //  console.log(data);
    })
    .catch((err)=>{
      console.log(err);
    })
  }

  const onPressDelete = (id, index)=> {
    Alert.alert("Note", "Are you sure you want to delete payment card?", [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel"
      },
      { text: "YES", onPress: () => deletePaymentCard(id, index) }
    ]);
  }

  const deletePaymentCard = (id, index) => {
    dispatch(PaymentCardAction.deletePaymentCard(index))
    dispatch(PaymentCardMiddleware.deletepaymentCard(id))
    .then((data)=>{
      // console.log(data);
    })
    .catch((err)=>{
      console.log(err);
    })

  }

  const onPressPayNow = () => {
    for(let i = 0 ; i < PaymentCardList.length ; i++){
      if(PaymentCardList[i].default_card == 1){
        var source_id = PaymentCardList[i].stripe_source_id
      }
    }
    let userData = {
      plan_id: props?.route?.params?.item?.plan_id,
      source_id: source_id
    }
    dispatch(SubscriptionMiddleware.postSubscribe(userData))
    .then((data)=>{
      if(data?.success){
        Alert.alert('Note',data?.message, [
          { text: "OK", onPress: () =>navigation.goBack() }
        ]);
      }
      else{
        Alert.alert('Note',data?.message)
      }
    })
    .catch((err)=>{
      console.log(err);
    })
  }


  const renderPaymentCards = ({ item,index }) => {
    // console.log('item', item.default_card);
    return (
      <View
        style={[
          style.cardsContainer,
          {
            borderWidth: 1,
            borderColor:
              item.default_card == 1 ? Colors.LIGHT_GREEN : Colors.BG_GRAY,
          },
        ]}>
        <TouchableOpacity
          onPress={() =>updateDefaultCard(item.id,index)}
          style={style.cardButton}>
          <Image
            source={item?.card_brand === 'master' ? MasterIcon : visaIcon}
            style={{ width: 35, height: 25 }}
          />
          <Text style={style.cardText}>************ {item?.card_end_number}</Text>
        </TouchableOpacity>

        {item.default_card == 1 ?  null : <TouchableOpacity
          onPress={() => onPressDelete(item.stripe_source_id, index)}
          style={{ marginHorizontal: 4 }}>
          <MaterialIcons name="delete" size={22} color={'#000'} />
        </TouchableOpacity>
        }
      </View>
    );
  };
  return (
    <View style={style.container}>
      <View style={{ paddingHorizontal: 22 }}>
        <Header title={'Payment'} headerLeft={true} />
      </View>

      <View style={style.titleContainer}>
        <Text style={style.title}>Credit or debit card</Text>
      </View>

      <View style={{flex:1}}>
        <FlatList
        refreshControl={
          <RefreshControl
              refreshing={loader}
              onRefresh={onRefreshServices}
          />
      }
          data={PaymentCardList}
          renderItem={renderPaymentCards}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate('AddCard')}
        style={style.addCardBtn}>
        <AntDesign
          name="pluscircleo"
          size={16}
          color={Colors.WHITE}
          style={{ paddingRight: 22 }}
        />
        <Text style={style.addCardText}>Add new card</Text>
      </TouchableOpacity>
      
     {
       PaymentCardList.length != 0 ?
       <View>
      {
      isSpecialist == 'Yes' ? <TouchableOpacity
        onPress={() => {
          console.log();
          isSpecialist == 'Yes'
            ? navigation.navigate('BookingReview', { review : review, payment_method_id : AuthState?.user?.user?.subscription[0].payment_method_id })
            : null
        }}
        style={style.addCardBtn}>
        <Text style={style.addCardText}>Pay Now</Text>
      </TouchableOpacity> : 
      
      <TouchableOpacity
      onPress={onPressPayNow}
      style={style.addCardBtn}>
      <Text style={style.addCardText}>Pay Now</Text>
      </TouchableOpacity>
      }
      </View>
      : null
      }

    </View>
  );
};

export default PaymentCards;
