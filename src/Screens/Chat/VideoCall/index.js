import React, { useEffect, useState } from 'react';
import {
  Image,
  PermissionsAndroid,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import { phone_red } from '../../../Assets';
import { Header, Popup } from '../../../Components';
import { Colors } from '../../../Styles';

const VideoCall = ({ route }) => {
  const hideCamera = route?.params?.hideCamera
  const [cameraPermission, setCameraPermission] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const devices = useCameraDevices('wide-angle-camera');
  const device = devices.front;
  useEffect(() => {
    requestCameraPermission();
  }, []);

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        setCameraPermission(true);
      } else {
        setCameraPermission(true);
      }
    } catch (err) {
      // console.warn(err);
      setCameraPermission(false);
    }
  };

  return (
    <View style={styles.contianer}>
      <Header headerLeft={true} title={'Stella'} />
      <View style={styles.flex1} />
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          onPress={() => setIsVisible(true)}
          style={styles.redPhoneContainer}>
          <Image
            source={phone_red}
            style={styles.redPhone}
            resizeMode={'contain'}
          />
          <Text style={styles.callTime}>01:30</Text>
        </TouchableOpacity>
        {hideCamera !== true && <View>
          {device && cameraPermission && (
            <Camera style={styles.camera} device={device} isActive={true} />
          )}
        </View>}
      </View>

      <Popup
        isVisible={isVisible}
        type={'videoCall'}
        title={'Call Ended'}
        onPress={value => setIsVisible(value)}
      />
    </View>
  );
};

export default VideoCall;

const styles = StyleSheet.create({
  contianer: {
    flex: 1,
    paddingHorizontal: 25,
    backgroundColor: Colors.LIGHT_GRAY,
  },
  flex1: { flex: 1 },
  bottomContainer: {
    flexDirection: 'row',
    marginBottom: 40,
    justifyContent: 'space-between',
  },
  redPhoneContainer: {
    justifyContent: 'flex-end',
  },
  redPhone: { width: 80 },
  callTime: {
    color: Colors.WHITE,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  camera: {
    width: 120,
    height: 200,
  },
});
