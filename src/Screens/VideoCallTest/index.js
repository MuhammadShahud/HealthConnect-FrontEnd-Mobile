import React, { useEffect, useRef, useState } from 'react';
import {
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
} from 'react-native';
import RtcEngine, {
  RtcLocalView,
  RtcRemoteView,
  VideoRenderMode,
} from 'react-native-agora';
import { useCameraDevices } from 'react-native-vision-camera';
// import requestCameraAndAudioPermission from './components/Permission';
import requestCameraAndAudioPermission from '../../../components/Permission';
import { phone_red } from '../../Assets';
import styles from '../../../components/style';
import { Header, Popup } from '../../Components';
import { Colors } from '../../Styles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import VideoMiddleware from '../../Store/Middleware/VideoMiddleware';
import { useDispatch, useSelector } from 'react-redux';
import SoundPlayer from 'react-native-sound-player'

const config = {
  //appId: 'e485b040bdfd42639b508c6555f801fe',
  appId: '7acffda405504ffd951b74019172e85f',
  token: '',
  channelName: '',
};

const index = (props) => {
  const call_token = props?.route?.params?.call_token;
  const channelName = props?.route?.params?.channelName;
  const _engine = useRef(null);
  const _timeout = useRef(null);
  const dispatch = useDispatch();
  const [isJoined, setJoined] = useState(false);
  //const [peerIds, setPeerIds] = useState <number[]> ([]);
  const [peerIds, setPeerIds] = useState([]);
  const devices = useCameraDevices('wide-angle-camera');
  const device = devices.front;
  // const [isVisible, setIsVisible] = useState(false);
  const [CallVisible, setCallVisible] = useState(false);
  const [disableVideoCamera, SetDisableVideoCamera] = useState(false);
  const [disableAudio, SetDisableAudio] = useState(false);
  const navigation = useNavigation();
  const AuthState = useSelector(state => state.AuthReducer);
  useEffect(async () => {
    SoundPlayer.playSoundFile('dail', 'wav')
    if (Platform.OS === 'android') {
      // Request required permissions from Android
      requestCameraAndAudioPermission().then(() => {
      });
    }
    await init();
    startCall();
    // if(!props?.route?.params?.Incoming){

    _timeout.current = setTimeout(() => {
      endCall();
    }, 20000)
    //}
  }, []);


  useEffect(() => {
    return () => {
      clearTimeout(_timeout.current)
    }
  }, [])

  const init = async () => {
    const { appId } = config;
    _engine.current = await RtcEngine.create(appId);
    console.warn("Engin=====>", _engine.current, "AppID:", appId);
    await _engine.current.enableVideo();
    _engine.current.addListener('Warning', (warn) => {
      console.log('Warning', warn);
    });

    _engine.current.addListener('Error', (err) => {
      console.log('Error1', err);
    });

    _engine.current.addListener('UserJoined', (uid, elapsed) => {
      console.log('UserJoined', uid, elapsed);
      // If new user

      if (peerIds.indexOf(uid) === -1) {
        // Add peer ID to state array
        setPeerIds((prev) => [...prev, uid]);
        clearTimeout(_timeout.current);
        SoundPlayer.stop();
      }
    });
    _engine.current.addListener('LeaveChannel', (stats) => {
      console.warn(stats.userCount)
    });

    _engine.current.addListener('UserOffline', (uid, reason) => {
      console.log('UserOffline', uid, reason);
      // Remove peer ID from state array
      setPeerIds((prev) => prev.filter((id) => id !== uid));
    });

    // If Local user joins RTC channel
    _engine.current.addListener(
      'JoinChannelSuccess',
      (channel, uid, elapsed) => {
        console.log('JoinChannelSuccess', channel, uid, elapsed);
        // Set state variable to true
        setJoined(true);
      }
    );
  };

  useEffect(() => {


    if (peerIds.length == 0) {
      endCall();

    }

  }, [peerIds]);

  /**
   * @name startCall
   * @description Function to start the call
   */
  const startCall = async () => {

    setCallVisible(true)
    setJoined(true)
    // EnableCameraMobile()
    //EnableAudio()
    // Join Channel using null token and channel name
    await _engine.current?.joinChannel(
      call_token,
      channelName,
      //config.token,
      //config.channelName,
      null,
      0
    );
  };

  /**
   * @name endCall
   * @description Function to end the call
   */
  const endCall = async () => {
    SoundPlayer.stop();
    // setCallVisible(false)
    await _engine.current.leaveChannel();
    _engine.current.destroy()
    setPeerIds([]);
    setJoined(false);

    //setCallVisible(false)

    // console.warn("Cancel", props?.route?.params?.Incoming);

    navigation.navigate("Dashboard");


  };
  const switchCameraMobile = async () => {
    await _engine.current?.switchCamera();
  };
  const DisableCameraMobile = async () => {
    SetDisableVideoCamera(true)
    await _engine.current?.enableLocalVideo(false);
  };
  const EnableCameraMobile = async () => {
    SetDisableVideoCamera(false)
    await _engine.current?.enableLocalVideo(true);
  };
  const DisableAudio = async () => {
    SetDisableAudio(true)
    await _engine.current?.enableLocalAudio(false);
  };
  const EnableAudio = async () => {
    SetDisableAudio(false)
    await _engine.current?.enableLocalAudio(true);
  };

  const _renderVideos = () => {
    return isJoined ? (
      <View style={styles.fullView}>
        <RtcLocalView.SurfaceView
          style={styles.maxbody}
          channelId={config.channelName}
          renderMode={VideoRenderMode.Hidden}
        />
        {_renderRemoteVideos()}
      </View>
    ) : null;
  };

  const _renderRemoteVideos = () => {
    return (
      <ScrollView
        style={styles.remoteContainer}
        contentContainerStyle={styles.padding}
        horizontal={true}
      >
        {peerIds.map((value) => {
          return (
            <RtcRemoteView.SurfaceView
              style={styles.remote}
              uid={value}
              channelId={config.channelName}
              renderMode={VideoRenderMode.Hidden}
              zOrderMediaOverlay={true}
            />
          );
        })}
      </ScrollView>
    );
  };
  return (
    <View style={styles.max}>
      <View style={styles.maxbody}>
        {_renderVideos()}
        <View style={styles.buttonHolder}>
          <View style={{ flexDirection: 'row' }}>
            <View>
              {
                disableVideoCamera ?
                  <TouchableOpacity onPress={EnableCameraMobile} style={styles.buttonCamera}>
                    <Feather name={'camera-off'} size={35} color={'black'} />
                  </TouchableOpacity>
                  :
                  <TouchableOpacity onPress={DisableCameraMobile} style={styles.buttonCamera}>
                    <Feather name={'camera-off'} size={35} color={'grey'} />
                  </TouchableOpacity>
              }
            </View>
            <View>
              {
                disableAudio ?
                  <TouchableOpacity onPress={EnableAudio} style={styles.buttonAudio}>
                    <Feather name={'mic-off'} size={35} color={'black'} />
                  </TouchableOpacity>
                  :
                  <TouchableOpacity onPress={DisableAudio} style={styles.buttonAudio}>
                    <Feather name={'mic'} size={35} color={'grey'} />
                  </TouchableOpacity>
              }
            </View>

          </View>
          {

            !CallVisible ?
              <TouchableOpacity onPress={startCall} style={styles.button}>
                <FontAwesome name={'phone'} size={40} color={'green'} />
              </TouchableOpacity>
              :
              <TouchableOpacity onPress={endCall} style={styles.button}>
                <FontAwesome name={'phone'} size={40} color={'red'} />
              </TouchableOpacity>
          }
          <TouchableOpacity onPress={switchCameraMobile} style={styles.button}>
            <Ionicons name={'camera-reverse-outline'} size={40} color={'grey'} />
          </TouchableOpacity>
        </View>

      </View>
      {
        peerIds.length == 0 && !props?.route?.params?.Incoming ?
          <View style={{ justifyContent: "center", alignItems: 'center', ...StyleSheet.absoluteFill }}>
            <Text style={{ fontWeight: "bold", color: "#fff", fontSize: 20 }}>
              Ringing
            </Text>
          </View> : null
      }

    </View>

  );
};

export default index;

