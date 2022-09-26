import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ScrollView, StyleSheet, View, FlatList, RefreshControl, Text } from 'react-native';
import { Header } from '../../Components';
import { Colors } from '../../Styles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import AppMiddleware from '../../Store/Middleware/AppMiddleware';
import { useDispatch } from 'react-redux';
import moment from 'moment';

const Notifications = () => {

    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [notificationList, setNotificationList] = useState([]);
    const [loader, setLoader] = useState(true);

    useEffect(() => {
        onRefreshApi()
    }, [])


    const onRefreshApi = () => {
        setLoader(true)
        dispatch(AppMiddleware.getNotification())
            .then((data) => {
                data ? setLoader(false) : setLoader(false)
                console.log('--index--', data?.data[0]);
                setNotificationList(data?.data)
            })
            .catch(() => setLoader(false))
    }

    const renderNotification = (item) => {
        // console.warn('-----', item);
        return (
            <View style={styles.notificationContainer}>
                <View style={{ flexDirection: 'row' }}>
                    <FontAwesome5 name={'plus'} size={20} color={Colors.LIGHT_GREEN} style={{ marginRight: 10 }} />
                    <View style={{ width: '92%' }}>
                        <Text numberOfLines={2} adjustsFontSizeToFit style={styles.notifTitle}>{item?.item?.title}</Text>
                        <Text style={styles.notifMessage}>{item?.item?.body}</Text>
                    </View>
                </View>
                <View style={styles.timeContainer}>
                    <Text style={styles.timeText}>{moment(item?.created_at).format('hh:mm A')}</Text>
                </View>
            </View>
        )
    }
    return (
        <View style={styles.container}>
            <Header headerLeft={true} title={'Notifications'} />

            <FlatList
                refreshControl={
                    <RefreshControl
                        refreshing={loader}
                        onRefresh={onRefreshApi}
                    />
                }
                data={notificationList}
                renderItem={renderNotification} />

        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1, paddingHorizontal: 20, backgroundColor: Colors.WHITE
    },
    notificationContainer: {
        borderBottomWidth: 0.5, paddingVertical: 15, borderColor: Colors.LIGHT_GRAY_1
    },
    notifTitle: {
        fontWeight: 'bold', color: Colors.LIGHT_GRAY,
        fontSize: 14,
    },
    notifMessage: {
        color: Colors.LIGHT_GRAY_1, fontSize: 13, marginTop: 3
    },
    timeContainer: {
        flexDirection: 'row', justifyContent: 'flex-end'
    },
    timeText: {
        fontSize: 10, color: Colors.LIGHT_GRAY_1
    }

})
export default Notifications;