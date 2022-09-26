import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Colors } from '../../../Styles';
import { style } from '../style';
import moment from 'moment';

const AppointmentListItem = props => {
  // console.log('=>Completed', props?.isCompleted, '=>review', props?.review, '=>cancel', props?.isCancelled);
  return (
    <View style={style.listContainer}>
      <Image source={props.image} style={style.image} />

      <View style={{ flex: 1, paddingHorizontal: 10 }}>
        <Text style={style.name}>
              {props.name}{' '}
              {props.speciality == 'Yes' ? (
                <Text
                  style={{
                    fontSize: 10,
                    fontWeight: 'bold',
                    color: Colors.LIGHT_GREEN,
                  }}>
                  Specialist
                </Text>
              ) : null}
        </Text>

        <Text style={{ paddingVertical: 2, color: 'grey' }}>{props.type}</Text>

        <Text style={{color: 'grey'}}>{props.time} | {moment(props.date).format('MM-DD-YYYY')}</Text>
      </View>

      {

        props?.buttonType === 'upcoming' ?
        <>
        <TouchableOpacity
        onPress={() => props.onPressCancel()}
        style={style.cancelButton}>
        <Text style={style.buttonText}>View Detail</Text>
        </TouchableOpacity>
        </> 
       :
       props?.isCancelled == 1 ?
       <TouchableOpacity
        onPress={() => props.onPressCancel()}
        style={style.cancelButton}>
        <Text style={style.buttonText}>View Detail</Text>
      </TouchableOpacity>
      :
      props?.isCompleted == 1 ?      
      <TouchableOpacity
        onPress={() => props.onPressCancel()}
        style={style.cancelButton}>
        <Text style={style.buttonText}>
        {props?.review
          ? 'Write Review'
          : 'View Detail'}
        </Text>
      </TouchableOpacity>      
       : null
      }

      {/* {props?.isCancelled == 1 ? 
      <Text style={{color: 'red', fontSize: 13}}>Cancelled</Text>
      :      
      props?.review ? 
      <>
      <TouchableOpacity
        onPress={() => props.onPressCancel()}
        style={style.cancelButton}>
        <Text style={style.buttonText}>
          {props.buttonType === 'upcoming'
            ? 'View Detail'
            : 'Write Review'}
        </Text>
      </TouchableOpacity>
      </>
       : 
       props.buttonType === 'upcoming' ?
       <>
       <TouchableOpacity
       onPress={() => props.onPressCancel()}
       style={style.cancelButton}>
       <Text style={style.buttonText}>View Detail</Text>
     </TouchableOpacity>
     </> : null
       
      
    } */}
    </View>
  );
};

export default AppointmentListItem;
