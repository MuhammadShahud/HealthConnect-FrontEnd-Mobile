import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ImageBackground, ScrollView, StyleSheet, View } from 'react-native';
import MCIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';
import { profileImg } from '../../Assets';
import { Header, Popup, SubmitButton, Text } from '../../Components';
import { Colors } from '../../Styles';
import { IMG_URL } from '../../Store/Apis';
import moment from 'moment';

const Profile = () => {

  const AuthState = useSelector(state => state.AuthReducer);
  const navigation = useNavigation();
  const [profileImage, setProfileImage] = useState(AuthState?.user?.user?.profile_pic ? { uri: IMG_URL + AuthState?.user?.user?.profile_pic } : require('../../Assets/Images/avatar.png'))
  const [isVisible, setIsVisible] = useState(false);
  const [popupType, setPopupType] = useState('changePassword');
  const [popupTitle, setPopupTitle] = useState('Change Password');

  // console.log('----',AuthState?.user?.user);


  const renderItem = (title, value) => {

    return (
      <View style={{ marginVertical: 10 }}>
        <Text style={{ color: Colors.BLACK, fontWeight: 'bold' }}>{title}</Text>
        <Text style={{ fontSize: 12, marginVertical: 3, color: '#000' }}>{value}</Text>
      </View>
    );
  };
  return (
    console.warn("Zip",AuthState?.user?.user),
    <View style={styles.container}>
      <Header headerLeft={true} title={'My Profile'} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.userContainer}>
          <ImageBackground
            source={profileImage}
            style={styles.userImage}>
          </ImageBackground>
          <Text style={styles.name}>
            {/* {AuthState.userRole !== 'patient' ? 'Dr. Fred Mask' : AuthState?.user?.user?.username} */}
            {AuthState?.user?.user?.username}
          </Text>
          <Text style={styles.email}>{AuthState?.user?.user?.email}</Text>
        </View>

        {AuthState.userRole !== 'patient' ? (
          <View style={{ paddingHorizontal: 15 }}>
            {renderItem('Profession', AuthState?.user?.user?.type)}
            {renderItem('Gender', AuthState?.user?.user?.gender)}
            {renderItem('Contact Number', AuthState?.user?.user?.phone_number)}
            {renderItem('Experience', AuthState?.user?.user?.experience)} 
            {renderItem('City', AuthState?.user?.user?.city)} 
            {renderItem('State', AuthState?.user?.user?.state)}            
            {renderItem('Country', AuthState?.user?.user?.country)} 
            {renderItem('Zip', AuthState?.user?.user?.zip)} 
            {renderItem('Timing',null)}
            {
              AuthState?.user?.user?.doctor_timing.map((item, index) => {
                return(
                  <View style={{ bottom: 15}}>
                  { item?.start_time ? <Text style={{color: '#000',fontWeight:'bold',fontSize:14}}>{item?.day}: <Text style={{color: '#000',fontWeight:'normal',fontSize:13}}>{moment("1 jan 1970 "+item?.start_time).format("hh:mm A")} to {moment("1 jan 1970 "+item?.end_time).format("hh:mm A")}</Text></Text> : null}
                  { item?.start_time ? <Text style={{color: '#000',fontWeight:'bold',fontSize:13}}>Interval: <Text style={{color: '#000',fontWeight:'normal',fontSize:13}}>{item?.interval} min</Text> </Text> : null }
                  </View>
                )
              })
            }
            {/* {renderItem('Day', 'Monday')}
            {renderItem('Time', '09:00 PM to 10:30 PM')}
            {renderItem('Interval Slots', '30 minutes')} */}
            {renderItem(
              'Address',
              AuthState?.user?.user?.address,
            )}
          </View>
        ) : (
          <View style={{ paddingHorizontal: 15 }}>
            {renderItem('Gender', AuthState?.user?.user?.gender)}
            {renderItem('Contact Number', AuthState?.user?.user?.phone_number)}
            {renderItem(
              'Address',
              AuthState?.user?.user?.address,
            )}
          </View>
        )}

        <SubmitButton
          buttonContainer={styles.button}
          text={'Edit'}
          onPress={() => {
            navigation.navigate('EditProfile');
          }}
        />

        <SubmitButton
          buttonContainer={styles.button}
          text={'Change Password'}
          onPress={() => setIsVisible(true)}
        />

        <Popup
          isVisible={isVisible}
          type={popupType}
          title={popupTitle}
          onPress={value => setIsVisible(value)}
        />
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: Colors.WHITE,
  },
  viewIcon: {
    marginHorizontal: 5,
  },
  viewText: {
    fontSize: 12,
  },
  userContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    alignItems: 'center',
  },
  name: {
    color: Colors.BLACK,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  email: {
    marginBottom: 10,
    fontSize: 12,
    color: 'grey'
  },
  viewContainer: {
    backgroundColor: Colors.WHITE,
    position: 'absolute',
    bottom: 0,
    right: 0,
    flexDirection: 'row',
    paddingHorizontal: 15,
    borderRadius: 3,
    alignItems: 'center',
  },
  userImage: {
    width: 150,
    height: 150,
    borderRadius: 15,
    overflow: 'hidden',
  },
  input: {
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  pickerContainer: {
    width: '90%',
    borderWidth: 1,
    borderRadius: 12,
    borderColor: Colors.LIGHT_GREEN,
    marginVertical: 6,
  },
  button: {
    width: '90%',
    paddingVertical: 18,
    marginVertical: 6,
    backgroundColor: Colors.LIGHT_GREEN,
    alignSelf: 'center',
    borderRadius: 12,
  },
});
export default Profile;
