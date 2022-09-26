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

class Ringing extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    RejectCall = () => {
        this.props.declineCall(id)
            .then((data) => {
                console.warn("DATA====>", data);
            })
            .catch((err) => console.log(err))
        this.props.navigation.goBack();
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{ flex: 0.75, backgroundColor: 'black', alignItems: 'center', justifyContent: 'center' }}>
                    <Image source={require('../../Assets/Images/avatar.png')} style={{ width: 200, height: 200, resizeMode: 'contain', backgroundColor: '#f2f2f2' }} />
                    <Text style={{ marginVertical: 20, fontSize: 20, color: 'white', fontWeight: 'bold', }}>Calling...</Text>
                </View>
                <View style={{ flex: 0.25, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
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

export default connect(mapStateToProps, mapDispatchToProps)(Ringing);

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