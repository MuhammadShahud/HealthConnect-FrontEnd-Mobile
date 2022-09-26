import {View, Text, ToastAndroid, Alert} from 'react-native';
import React, {useState, useEffect} from 'react';
import {style} from './style';
import {Header, SubmitButton, TextInput} from '../../Components';
import {AirbnbRating} from 'react-native-ratings';
import {Colors} from '../../Styles';
import ReviewMiddleware from '../../Store/Middleware/ReviewMiddleware';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

const AddReview = props => {


  const [rating, setRating] = useState(0)
  const [review, setReview] = useState('')
  const dispatch = useDispatch();
  const navigation = useNavigation();
  let item = props.route.params;

  // console.log('=',item?.doctor?.id);


  const onPressSubmit = () => {
    if(rating == 0){
      ToastAndroid.showWithGravityAndOffset(
        "Select stars..",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50
      );
    }
    else if(review == ''){
      ToastAndroid.showWithGravityAndOffset(
        "Enter review..",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50
      );
    }
    else{
      let userData = {
        comments: review,
        rating: rating,
        doctor_id: item?.doctor?.id,
        appointment_id: item?.id
      }
      dispatch(ReviewMiddleware.writeReviews(userData))
      .then((data)=>{
        if(data?.success){
          Alert.alert("Note", data?.message, [
            { text: "Ok", onPress: () => navigation.goBack() }
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

  }
  return (
    <View style={style.container}>
      <View style={{paddingHorizontal: 22}}>
        <Header headerLeft={true} title={'Reviews'} />
      </View>

      <View
        style={{
          width: '90%',
          alignSelf: 'center',
          marginVertical: 18,
        }}>
        <Text style={{fontSize: 18, fontWeight: 'bold', color: Colors.BLACK}}>
          How was your experience?
        </Text>
      </View>
      <AirbnbRating showRating={false} size={28} defaultRating={rating} onFinishRating={val=>setRating(val)} />

      <TextInput
        placeholder="Type here"
        placeholderTextColor='grey'
        onChangeText={text=>setReview(text)}
        inputContainerStyle={style.inputContainer}
        line={true}
        style={[style.inputStyle, {textAlignVertical: 'top', color: '#000'}]}
      />

      <View
        style={{
          width: '90%',
          alignSelf: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <SubmitButton
          text={'Submit'}
          onPress={onPressSubmit}
          buttonContainer={{
            width: '45%',
            backgroundColor: Colors.PRIMRATY_BLUE,
          }}
        />
        <SubmitButton
          text={'Cancel'}
          onPress={() => navigation.goBack()}
          textStyle={{color: Colors.BLACK}}
          buttonContainer={{
            width: '45%',
            backgroundColor: Colors.BG_GRAY,
          }}
        />
      </View>
    </View>
  );
};

export default AddReview;
