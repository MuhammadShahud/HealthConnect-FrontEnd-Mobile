import React, {useState, useEffect} from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { calendar_green, PatientProfileImg } from '../../Assets';
import { Text } from '../../Components';
import { Colors } from '../../Styles';
import SubmitButton from '../FormSubmitButton';
import { IMG_URL } from '../../Store/Apis';
import moment from 'moment';


const AppointmentRequest = ({ onPress, item, onPressAccept, onPressDecline }) =>{

    return(
    <>
        <TouchableOpacity onPress={onPress} style={{ marginHorizontal: 20, }} >
            <View style={{ marginVertical: 3, flexDirection: 'row', backgroundColor: Colors.BG_GRAY, paddingVertical: 10, paddingHorizontal: 20, borderRadius: 10 }}>
                <Image source={calendar_green} style={{ width: 25, height: 25, borderRadius: 100 }} resizeMode={'contain'} />
                <Text style={{ color: Colors.BLACK, fontWeight: 'bold', marginLeft: 20 }}>Appointment Request</Text>
            </View>
            <View>
                <View style={{ flexDirection: 'row', paddingTop: 20, backgroundColor: Colors.BG_GRAY, paddingHorizontal: 20, borderRadius: 10 }}>
                    <Image source={item?.user?.profile_pic ? {uri : IMG_URL + item?.user?.profile_pic} : require('../../Assets/Images/avatar.png')} style={{ width: 50, height: 50 }} resizeMode={'contain'} />
                    <View style={{ marginLeft: 15 }}>
                        <Text style={{ color: Colors.BLACK, fontWeight: 'bold' }}>{item?.patient_name}</Text>
                        <View style={{ flexDirection: 'row', marginVertical: 10 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Image source={calendar_green} style={{ width: 15, height: 15 }} resizeMode={'contain'} />
                                <Text style={{ marginLeft: 5, fontSize: 10, color: 'grey' }}>{moment(item?.date).format('MM-DD-YYYY')}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 5 }}>
                                <Image source={calendar_green} style={{ width: 15, height: 15 }} resizeMode={'contain'} />
                                <Text style={{ marginLeft: 5, fontSize: 10, color: 'grey' }}>{item?.time}</Text>
                            </View>
                        </View>

                    </View>
                </View>
            </View>
        </TouchableOpacity>
        <View style={{ backgroundColor: Colors.BG_GRAY, marginHorizontal: 20 }}>
            <View style={{ flexDirection: 'row', width: 270, paddingLeft: 20 }}>
                <SubmitButton 
                text={'Accept'} 
                onPress={()=>onPressAccept(item.id)}                  
                buttonContainer={styles.buttonContainer} 
                textStyle={{ fontSize: 13 }} 
                />
                <SubmitButton 
                text={'Decline'} 
                onPress={()=>onPressDecline(item.id)}
                buttonContainer={[styles.buttonContainer, { backgroundColor: Colors.DARK_BLUE }]} 
                textStyle={{ fontSize: 13 }} 
                />
            </View>
        </View>
    </>
)}

const styles = StyleSheet.create({
    buttonContainer: {
        marginRight: 5, paddingVertical: 10,
        flex: 1,
        alignSelf: 'center',
        borderRadius: 12,
        backgroundColor: Colors.LIGHT_GREEN
    }
})


export default AppointmentRequest