import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { AirbnbRating } from 'react-native-ratings'
import { MaleDoctorImg } from '../../Assets'
import { Text } from '../../Components'
import { IMG_URL } from '../../Store/Apis'
import { Colors } from '../../Styles'
import moment from 'moment'

const Review = ({ item }) => {
    console.log('===>',item?.created_at);
    return (
        <View style={styles.container}>
            <View style={styles.userContainer}>
                <View style={styles.userSubContainer}>
                    <Image source={
                    item?.user?.profile_pic != null
                        ? { uri: IMG_URL + item?.user?.profile_pic }
                        : require('../../Assets/Images/avatar.png')
                    }
                    style={styles.userimage} 
                    />
                    <View style={{ paddingHorizontal: 10 }}>
                        <Text style={styles.name}>{item?.user?.username}</Text>
                        <Text style={styles.dateAgo}>{moment(item?.created_at).fromNow()}</Text>
                        <AirbnbRating showRating={false} count={5} defaultRating={item?.rating} size={10} />
                    </View>
                </View>
            </View>
            <View style={styles.reviewContainer}>
                <Text style={styles.reviewText}>{item?.comments}</Text>
            </View>
        </View>
    )
}

export default Review

const styles = StyleSheet.create({
    container: {
        marginBottom: 5, borderRadius: 15, overflow: 'hidden'
    },
    userContainer: {
        backgroundColor: Colors.BG_GRAY, paddingVertical: 10, marginVertical: 3
    },
    userSubContainer: {
        flexDirection: 'row', paddingHorizontal: 10
    },
    userimage: {
        width: 50, height: 50, borderRadius: 100
    },
    name: {
        fontSize: 16, color: Colors.BLACK, fontWeight: 'bold'
    },
    dateAgo: { fontSize: 12, color: Colors.LIGHT_GRAY_1, fontWeight: '300' },
    reviewContainer: {
        backgroundColor: Colors.BG_GRAY, paddingHorizontal: 15, paddingVertical: 10
    },
    reviewText: {
        fontSize: 18, color: Colors.LIGHT_GRAY_1, fontStyle: 'italic', fontWeight: '300'
    }
})