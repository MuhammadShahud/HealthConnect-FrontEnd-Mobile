import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  ToastAndroid,
  Alert,
} from 'react-native';
import {style} from '../style';
import {Header, SubmitButton, TextInput} from '../../../Components';
import {Colors} from '../../../Styles';
import {Calendar} from 'react-native-calendars';
import {ClockIcon} from '../../../Assets';
import SelectDropdown from 'react-native-select-dropdown';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import notifee, {TimestampTrigger, TriggerType} from '@notifee/react-native';

const timeList = [
  {time: '08:30'},
  {time: '09:00'},
  {time: '09:30'},
  {time: '10:00'},
  {time: '10:30'},
  {time: '11:00'},
];

const pickerList = ['Gender', 'Male', 'Female'];

const BookAppointment = props => {
  const [time, setTime] = useState([]);
  const [pickerData, setPicker] = useState(pickerList);
  const [activeTime, setActiveTime] = useState(null);
  const [gender, setGender] = useState('');
  const [ReminderNotify, setReminderNotify] = useState([
    'Set Notification Reminder',
    '15 minutes',
    '20 minutes',
    '25 minutes',
    '30 minutes',
  ]);
  const [selectedReminder, setselectedReminder] = useState(null);
  const [markDate, setMarkDate] = useState('');
  const navigation = useNavigation();
  let {docInfo} = props?.route?.params;

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [patientName, setPatientName] = useState('');
  const [patientNumer, setPatientNumber] = useState('');
  const [patientAge, setPatientAge] = useState('');
  const item = props?.route?.params;
  const [minutes, setminutes] = useState(false);
  const [currentDate, setcurrentDate] = useState('YYYY-MM-DD');

  // console.log('----',docInfo?.time_slot);

  const onPressDay = day => {
    let array = [];
    if (moment(day).format('dddd') == 'Monday') {
      for (let i = 0; i < docInfo?.time_slot?.Monday?.length; i++) {
        if (
          moment().format('x') < moment(day+' '+docInfo?.time_slot?.Monday[i]?.slot_start_time).format('x')
        ) {
          array.push({
            time:
              moment(
                '1 jan 1970 ' + docInfo?.time_slot?.Monday[i]?.slot_start_time,
              ).format('hh:mm A') +
              ' To ' +
              moment(
                '1 jan 1970 ' + docInfo?.time_slot?.Monday[i]?.slot_end_time,
              ).format('hh:mm A'),
          });
        }
      }
      setTime(array);
    } else if (moment(day).format('dddd') == 'Tuesday') {
      let array = [];
      for (let i = 0; i < docInfo?.time_slot?.Tuesday?.length; i++) {
        if (
          moment().format('x') < moment(day+' '+docInfo?.time_slot?.Tuesday[i]?.slot_start_time).format('x')
        ) {
          array.push({
            time:
              moment(
                '1 jan 1970 ' + docInfo?.time_slot?.Tuesday[i]?.slot_start_time,
              ).format('hh:mm A') +
              ' To ' +
              moment(
                '1 jan 1970 ' + docInfo?.time_slot?.Tuesday[i]?.slot_end_time,
              ).format('hh:mm A'),
          });
        }
      }
      setTime(array);
    } else if (moment(day).format('dddd') == 'Wednesday') {
      let array = [];
      for (let i = 0; i < docInfo?.time_slot?.Wednesday?.length; i++) {
        if (
          moment().format('x') < moment(day+' '+docInfo?.time_slot?.Wednesday[i]?.slot_start_time).format('x')
        ) {
          array.push({
            time:
              moment(
                '1 jan 1970 ' +
                  docInfo?.time_slot?.Wednesday[i]?.slot_start_time,
              ).format('hh:mm A') +
              ' To ' +
              moment(
                '1 jan 1970 ' + docInfo?.time_slot?.Wednesday[i]?.slot_end_time,
              ).format('hh:mm A'),
          });
        }
      }
      setTime(array);
    } else if (moment(day).format('dddd') == 'Thursday') {
      let array = [];
      for (let i = 0; i < docInfo?.time_slot?.Thursday?.length; i++) {
        if (
          moment().format('x') < moment(day+' '+docInfo?.time_slot?.Thursday[i]?.slot_start_time).format('x')
        ) {
          array.push({
            time:
              moment(
                '1 jan 1970 ' + docInfo?.time_slot?.Thursday[i]?.slot_start_time,
              ).format('hh:mm A') +
              ' To ' +
              moment(
                '1 jan 1970 ' + docInfo?.time_slot?.Thursday[i]?.slot_end_time,
              ).format('hh:mm A'),
          });
        }
      }
      setTime(array);
    } else if (moment(day).format('dddd') == 'Friday') {
      let array = [];
      for (let i = 0; i < docInfo?.time_slot?.Friday?.length; i++) {
        if (
          moment().format('x') < moment(day+' '+docInfo?.time_slot?.Friday[i]?.slot_start_time).format('x')
        ) {
          array.push({
            time:
              moment(
                '1 jan 1970 ' + docInfo?.time_slot?.Friday[i]?.slot_start_time,
              ).format('hh:mm A') +
              ' To ' +
              moment(
                '1 jan 1970 ' + docInfo?.time_slot?.Friday[i]?.slot_end_time,
              ).format('hh:mm A'),
          });
        }
      }
      setTime(array);
    } else if (moment(day).format('dddd') == 'Saturday') {
      let array = [];
      for (let i = 0; i < docInfo?.time_slot?.Saturday?.length; i++) {
        if (
          moment().format('x') < moment(day+' '+docInfo?.time_slot?.Saturday[i]?.slot_start_time).format('x')
        ) {
          array.push({
            time:
              moment(
                '1 jan 1970 ' + docInfo?.time_slot?.Saturday[i]?.slot_start_time,
              ).format('hh:mm A') +
              ' To ' +
              moment(
                '1 jan 1970 ' + docInfo?.time_slot?.Saturday[i]?.slot_end_time,
              ).format('hh:mm A'),
          });
        }
      }
      setTime(array);
    } else if (moment(day).format('dddd') == 'Sunday') {
      let array = [];
      for (let i = 0; i < docInfo?.time_slot?.Sunday?.length; i++) {
        if (
          moment().format('x') < moment(day+' '+docInfo?.time_slot?.Sunday[i]?.slot_start_time).format('x')
        ) {
          array.push({
            time:
              moment(
                '1 jan 1970 ' + docInfo?.time_slot?.Sunday[i]?.slot_start_time,
              ).format('hh:mm A') +
              ' To ' +
              moment(
                '1 jan 1970 ' + docInfo?.time_slot?.Sunday[i]?.slot_end_time,
              ).format('hh:mm A'),
          });
        }
      }
      setTime(array);
    }
  };

  const reviewOppointment = () => {
    if (selectedDate == null) {
      ToastAndroid.showWithGravityAndOffset(
        'Select date..',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
    } else if (selectedTime == null) {
      ToastAndroid.showWithGravityAndOffset(
        'Select time..',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
    } else if (patientName == '') {
      ToastAndroid.showWithGravityAndOffset(
        'Enter patient name..',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
    } else if (patientNumer == '') {
      ToastAndroid.showWithGravityAndOffset(
        'Enter patient number..',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
    } else if (patientAge == '') {
      ToastAndroid.showWithGravityAndOffset(
        'Enter patient age..',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
    } else if (gender == '' || gender == 'Gender') {
      ToastAndroid.showWithGravityAndOffset(
        'Select gender..',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
    } else {
      if (docInfo?.specialist == 'No') {
        navigation.navigate('BookingReview', {
          review: {
            docInfo: docInfo,
            date: selectedDate,
            time: selectedTime,
            name: patientName,
            number: patientNumer,
            age: patientAge,
            gender: gender,
          },
        });
      } else {
        Alert.alert('Note', 'Extra amount will be charge for specialist.', [
          {
            text: 'Cancel',
            onPress: () => null,
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => {
              navigation.navigate('PaymentCards', {
                docInfo: docInfo,
                date: selectedDate,
                time: selectedTime,
                name: patientName,
                number: patientNumer,
                age: patientAge,
                gender: gender,
              });
            },
          },
        ]);
      }
    }

    if (selectedDate == null || selectedTime == null) {
      console.log('date time selected');
    } else {
      if (selectedReminder) {
        let minutes = selectedReminder.split(' ')[0];
        let minsTomilli = minutes * 60000;
        let time = moment(moment(selectedDate).format('DD MMM YYYY') + " " + selectedTime.split('To')[0]).format(
          'HH:mm:ss',
        );
        let convertTime = moment(selectedDate + ' ' + time).format('x');
        const trigger = {
          type: TriggerType.TIMESTAMP,
          timestamp: convertTime - minsTomilli,
        };
        notifee.createTriggerNotification(
          {
            title: 'Appointment Reminder',
            body: 'You have appointment with ' + docInfo?.username,
            android: {
              channelId: 'healthconet',
              importance: 4,
              sound: 'default',
            },
          },
          trigger,
        );
      }
    }
  };

  return (
    <View style={style.container}>
      <View style={{paddingHorizontal: 22}}>
        <Header headerLeft={true} title={'Book an Appointment'} />
      </View>

      <ScrollView>
        <View style={{width: '90%', alignSelf: 'center'}}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              color: Colors.BLACK,
              paddingVertical: 12,
            }}>
            Select Date
          </Text>

          <Calendar
            current={moment().format('YYYY-MM-DD')}
            minDate={moment().format('YYYY-MM-DD')}
            onDayPress={day => {
              setMarkDate({
                [day.dateString]: {
                  selected: true,
                  selectedColor: Colors.LIGHT_GREEN,
                },
              });
              setSelectedDate(moment(day?.dateString).format('YYYY-MM-DD'));
              onPressDay(day?.dateString);
            }}
            markedDates={markDate}
          />

          {time.length != 0 ? (
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: Colors.BLACK,
                paddingVertical: 12,
              }}>
              Select Time
            </Text>
          ) : null}

          {
            <View
              style={{
                width: '100%',
              }}>
              {time.map((item, index) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      setActiveTime(index)
                      setSelectedTime(item.time);
                      let remain=moment(
                        moment(selectedDate).format('DD MMM YYYY') +
                          ' ' +
                          item.time.split('To')[0],
                      ).diff(moment());
                      if((remain/60000)>=30)
                      {
                        setminutes(true);
                      }
                      else
                      {
                        setminutes(false)
                      }
                    }}
                    style={{
                      flexDirection: 'row',
                      paddingVertical: 6,
                      paddingHorizontal: 12,
                      backgroundColor:
                        index === activeTime
                          ? Colors.LIGHT_GREEN
                          : Colors.WHITE,
                    }}>
                    <Image
                      source={ClockIcon}
                      style={{
                        width: 18,
                        height: 18,
                        tintColor:
                          index === activeTime ? Colors.WHITE : Colors.BLACK,
                      }}
                    />

                    <Text
                      style={{
                        paddingLeft: 5,
                        color:
                          index === activeTime ? Colors.WHITE : Colors.BLACK,
                      }}>
                      {item.time}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          }

          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              color: Colors.BLACK,
              paddingVertical: 12,
            }}>
            Add Patient's Details
          </Text>

          <TextInput
            value={patientName}
            placeholder={`Patient's Name`}
            placeholderTextColor={Colors.GRAY}
            onChangeText={text => setPatientName(text)}
            inputContainerStyle={{width: '100%'}}
            style={style.input}
          />
          <TextInput
            value={patientNumer}
            keyboardType="phone-pad"
            placeholder={`Patient's Number`}
            length={14}
            placeholderTextColor={Colors.GRAY}
            onChangeText={text => setPatientNumber(text)}
            inputContainerStyle={{width: '100%'}}
            style={style.input}
          />
          <TextInput
            value={patientAge}
            keyboardType="number-pad"
            placeholder={`Patient's Age`}
            length={3}
            placeholderTextColor={Colors.GRAY}
            onChangeText={text => setPatientAge(text)}
            inputContainerStyle={{width: '100%'}}
            style={style.input}
          />

          <View style={style.pickerContainer}>
            <SelectDropdown
              buttonStyle={{width: '100%', backgroundColor: 'transparent'}}
              buttonTextStyle={{color: Colors.GRAY}}
              defaultValue={'Gender'}
              data={pickerData}
              onSelect={(selectedItem, index) => {
                setGender(selectedItem);
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem;
              }}
              rowTextForSelection={(item, index) => {
                return item;
              }}
            />
          </View>

          {minutes ? (
            <View style={style.pickerContainer}>
              <SelectDropdown
                buttonStyle={{width: '100%', backgroundColor: 'transparent'}}
                buttonTextStyle={{color: Colors.GRAY}}
                defaultValue={'Set Notification Reminder'}
                data={ReminderNotify}
                onSelect={(selectedItem, index) => {
                  setselectedReminder(selectedItem);
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                  return selectedItem;
                }}
                rowTextForSelection={(item, index) => {
                  return item;
                }}
              />
            </View>
          ) : null}
        </View>

        <SubmitButton
          onPress={reviewOppointment}
          text={'Review Appointment'}
          textStyle={style.textStyle}
          buttonContainer={style.bookButton}
        />
      </ScrollView>
    </View>
  );
};

export default BookAppointment;
