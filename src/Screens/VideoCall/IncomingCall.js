import React, { Component } from 'react';
import {
    Platform,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
    Image,
    StyleSheet,

} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import { Colors } from '../../Styles';
import * as Animatable from 'react-native-animatable';
import VideoMiddleware from '../../Store/Middleware/VideoMiddleware';
import { connect } from 'react-redux';
import SoundPlayer from 'react-native-sound-player'
import { IMG_URL } from '../../Store/Apis';

class IncomingCall extends Component {
    constructor(props) {
        super(props);
        this.state = {
            AnswerOrReject: false,
        };
    }
    componentDidMount = () => {
        console.warn("INcoming DATAA:", this.props.route.params?.data);
        SoundPlayer.playSoundFile('ring', 'wav')
        // SoundPlayer.setNumberOfLoops(-1)
        setTimeout(() => {
            if (!this.state.AnswerOrReject) {
                SoundPlayer.stop();
                this.props.navigation.goBack();

            }
        }, 20000)
    }
    AnswerCall = () => {
        SoundPlayer.stop();
        this.setState({ AnswerOrReject: true })
        let data = this.props.route.params?.data;
        //console.log('call_token:,', data?.token, 'channelName:', "healthconet" + this.props?.user?.user?.id, 'OpponentID:', data?.from_call?.id);
        //console.log("from_Data======>", data?.from_call, 'from_Data======>HHHHH-====>', JSON.parse(data?.from_call).id)
        // this.props.navigation.navigate('VideoCallTest', { call_token: data?.data[0], channelName: data?.data[1], OpponentID:props?.route?.params?.item?.user_id })
        this.props.navigation.navigate('VideoCallTest', { Incoming: true, call_token: data?.token, channelName: "healthconet" + this.props?.user?.user?.id, OpponentID: JSON.parse(data?.from_call).id })
    }
    RejectCall = () => {
        SoundPlayer.stop();
        this.setState({ AnswerOrReject: true })
        let id = this.props?.route?.params?.OpponentID
        //let id = 7
        console.warn("end", id);
        this.props.declineCall(id)
            .then((data) => {
                console.warn("DATA====>", data);
            })
            .catch((err) => console.log(err))
        this.props.navigation.goBack();
    }

    render() {
        let Data = JSON.parse(this.props.route.params?.data?.from_call);
        console.warn(Data?.username)
        return (
            <View style={styles.container}>
                <View style={{ flex: 0.75, backgroundColor: 'black', alignItems: 'center', justifyContent: 'center' }}>
                    <Image source={Data?.profile_pic ? { uri: IMG_URL + Data?.profile_pic } : require('../../Assets/Images/avatar.png')} style={{ width: 160, height: 160, resizeMode: 'contain', backgroundColor: '#f2f2f2' }} />
                    <Text style={{ marginVertical: 20, fontSize: 17, color: 'white', fontWeight: 'bold', }}>Incoming Call From {"\n" + Data?.username}...</Text>
                </View>
                <View style={{ flex: 0.25, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                    <Animatable.View delay={1000} useNativeDriver duration={10000} animation={"bounce"} >
                        <TouchableOpacity onPress={() => this.AnswerCall()} style={styles.button}>
                            <FontAwesome name={'phone'} size={60} color={'green'} />
                        </TouchableOpacity>
                    </Animatable.View>
                    <Animatable.View useNativeDriver duration={1} animation={"shake"}>
                        <TouchableOpacity onPress={() => this.RejectCall()} style={styles.button}>
                            <FontAwesome name={'phone'} size={60} color={'red'} />
                        </TouchableOpacity>
                    </Animatable.View>
                </View>
            </View >
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.AuthReducer.user,
    };
};
const mapDispatchToProps = dispatch => ({

    declineCall: payload => dispatch(VideoMiddleware.declineCall(payload)),

});

export default connect(mapStateToProps, mapDispatchToProps)(IncomingCall);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    button: {
        paddding: 40,
        backgroundColor: 'lightgrey',
        width: 90,
        height: 90,
        borderRadius: 60,
        alignItems: 'center',
        justifyContent: 'center'

    },
})