import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity, } from 'react-native';
import { calendar_green, FemaleDoctorImg } from '../../Assets';
import { Text } from '../../Components';
import { Colors } from '../../Styles';
import SubmitButton from '../FormSubmitButton';
import { IMG_URL } from '../../Store/Apis';
import moment from 'moment';


const UpCommingAppointments = ({ onPress, item, disable, past }) => {
    // console.warn('----------->', item,);
    return (
        <TouchableOpacity disabled={disable || false} onPress={onPress} style={styles.container}>
            <Image source={item?.user?.profile_pic ? { uri: IMG_URL + item?.user?.profile_pic } : require('../../Assets/Images/avatar.png')} style={styles.userImage} resizeMode={'contain'} />
            <View style={{ width: '80%', marginLeft: 15 }}>
                <Text style={styles.name}>{item?.patient_name}</Text>
                {past ? <View style={{ position: 'absolute', right: 5, top: 5, }}>
                    {item?.is_cancelled == 1
                        ?
                        <Text style={{ fontSize: 14, fontWeight: 'normal', color: 'red' }}>Cancelled</Text>

                        :
                        item?.is_completed == 1 ?
                            <Text style={{ fontSize: 14, fontWeight: 'normal', color: 'green' }}>Completed</Text>
                            : null

                    }
                </View>
                    : null}
                <View style={styles.dateTimeContainer}>
                    <View style={styles.dateContainer}>
                        <Image source={calendar_green} style={styles.datetimeIcon} resizeMode={'contain'} />
                        <Text style={styles.datetimeText}>{moment(item?.date).format('MM-DD-YYYY')}</Text>
                    </View>
                    <View style={styles.timeContainer}>
                        <Image source={calendar_green} style={styles.datetimeIcon} resizeMode={'contain'} />
                        <Text style={styles.datetimeText}>{item?.time}</Text>
                    </View>
                </View>


            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', paddingTop: 20, backgroundColor: Colors.BG_GRAY, marginHorizontal: 20, paddingHorizontal: 10, borderRadius: 10, marginVertical: 5
    },
    userImage: {
        width: 50, height: 50
    },
    name: {
        color: Colors.BLACK, fontWeight: 'bold',width:'68%',
    },
    dateTimeContainer: {
        flexDirection: 'row', marginVertical: 10

    },
    dateContainer: {
        flexDirection: 'row', alignItems: 'center'
    },
    datetimeText: {
        marginLeft: 5, fontSize: 10, color: '#000'
    },
    timeContainer: {
        flexDirection: 'row', alignItems: 'center', marginLeft: 5
    },
    datetimeIcon: {
        width: 15, height: 15,
    }
})

export default UpCommingAppointments