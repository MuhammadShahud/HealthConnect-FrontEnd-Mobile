import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ToastAndroid, StyleSheet, Alert } from 'react-native';
import { style } from './style';
import { Header, TextInput } from '../../Components';
import PaymentCardMiddleware from '../../Store/Middleware/PaymentCardMiddleware';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { Colors } from '../../Styles';
import { useNavigation } from '@react-navigation/native';

const AddCard = (props) => {

  const [cardName, setCardName] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [expireDate, setExpireDate] = useState('MM/YYYY')
  const [cvc, setCvc] = useState('')
  const [timePickerVisible, setTimePickerVisibility] = useState(false);
  const dispatch = useDispatch();
  const navigation=useNavigation();


  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    // console.warn("A date has been picked: ", moment(date).format('MM/YYYY'));
    setExpireDate(moment(date).format('MM/YYYY'))
    hideTimePicker();
  };

  const onPressAddCard = () => {
    if (cardNumber == '') {
      ToastAndroid.showWithGravityAndOffset(
        "Enter card number..",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50
      );
    }
    else if (expireDate == 'MM/YYYY') {
      ToastAndroid.showWithGravityAndOffset(
        "Enter expire date..",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50
      );
    }
    else if (cvc == '') {
      ToastAndroid.showWithGravityAndOffset(
        "Enter CVV/CVC..",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50
      );
    }
    else if (cvc.length <= 2) {
      ToastAndroid.showWithGravityAndOffset(
        "Enter Correct CVV/CVC..",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50
      );
      setCvc('')
    }
    else {
      let userData = {
        card_number: cardNumber,
        cvc: cvc,
        exp_date: expireDate,
      };
      dispatch(PaymentCardMiddleware.addPaymentCard(userData))
        .then(data => {
         if(data?.data?.success){
          Alert.alert('Note', data?.data?.message, [
            { text: "OK", onPress: () => navigation.goBack() }
          ]);             
        }
        else{
          Alert.alert('Note', data?.data?.message)
        }
        })
        .catch(err => { console.log(err) });
    }
  }

  return (
    <View style={style.container}>
      <View style={{ paddingHorizontal: 22 }}>
        <Header title={'Add Card'} headerLeft={true} />
      </View>

      <View style={{ marginVertical: 16 }}>

        <TextInput
          placeholder={'Card Number'}
          keyboardType='number-pad'
          placeholderTextColor='grey'
          value={cardNumber}
          onChangeText={text => setCardNumber(text)}
          style={{ paddingHorizontal: 12, color: '#000', width: '100%' }}
          inputContainerStyle={{ alignSelf: 'center' }}
          length={16}
        />

        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'center',
            width: '90%',
            alignSelf: 'center',
            justifyContent: 'space-between',
            paddingVertical: 12,
          }}>

          <TouchableOpacity
            onPress={showTimePicker}
            style={styles.button} >
            <Text style={{ paddingHorizontal: 12, color: 'grey' }}>{expireDate}</Text>
          </TouchableOpacity>

          <DateTimePickerModal
            isVisible={timePickerVisible}
            mode="date"
            minimumDate={moment().toDate()}
            onConfirm={handleConfirm}
            onCancel={hideTimePicker}
          />

          <TextInput
            placeholder={'CVV/CVC'}
            keyboardType='number-pad'
            placeholderTextColor='grey'
            value={cvc}
            length={4}
            onChangeText={text => setCvc(text)}
            style={{ paddingHorizontal: 12, color: '#000', width: '100%' }}
            inputContainerStyle={{ width: '47%', alignSelf: 'center' }}
          />
        </View>

        {/* <View
          style={{
            flexDirection: 'row',
            alignSelf: 'center',
            width: '90%',
            alignSelf: 'center',
            justifyContent: 'space-between',
          }}>
          <TextInput
            placeholder={'City'}
            onChangeText={text => {}}
            style={{paddingHorizontal: 12}}
            inputContainerStyle={{width: '32%', alignSelf: 'center'}}
          />
          <TextInput
            placeholder={'State'}
            onChangeText={text => {}}
            style={{paddingHorizontal: 12}}
            inputContainerStyle={{width: '32%', alignSelf: 'center'}}
          />
          <TextInput
            placeholder={'Zip Code'}
            onChangeText={text => {}}
            style={{paddingHorizontal: 12}}
            inputContainerStyle={{width: '32%', alignSelf: 'center'}}
          />
        </View> */}

        {/* <TextInput
          placeholder={'Card Number'}
          onChangeText={text => {}}
          style={{paddingHorizontal: 12}}
          inputContainerStyle={{alignSelf: 'center', marginTop: 20}}
        /> */}
      </View>

      <TouchableOpacity
        onPress={onPressAddCard}
        style={style.addCardBtn}>
        <Text style={style.addCardText}>Add Card</Text>
      </TouchableOpacity>
    </View>
  );
};


export const styles = StyleSheet.create({

  button: {
    width: '47%',
    borderWidth: 1,
    borderRadius: 12,
    borderColor: Colors.LIGHT_GREEN,
    justifyContent: 'center',
    marginVertical: 7,
    height: 45,
  },

});

export default AddCard;
