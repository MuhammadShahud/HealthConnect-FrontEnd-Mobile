import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Text } from '..';
import { Colors } from '../../Styles';
import { avatar } from '../../Utils';

const Comment = ({ comment }) => (
    <View style={styles.container}>
        <View>
            <Image source={{ uri: avatar }}
                style={styles.avatar} />
        </View>
        <View style={styles.commentContainer}>
            <View style={styles.userNameContainer}>
                <Text style={styles.username}>{comment?.email}</Text>
            </View>
            <Text style={styles.font12}>Frontend Developer</Text>
            <Text style={styles.font14}>{comment?.body}</Text>
        </View>
    </View>
);
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', alignItems: 'center'
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 100
    },
    commentContainer: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginVertical: 5, marginHorizontal: 5, borderRadius: 6,
        backgroundColor: Colors.LIGHT_BLUE,
        flex: 1
    },
    userNameContainer: {
        flexDirection: 'row', alignItems: 'center'
    },
    username: {
        fontWeight: 'bold', fontSize: 14
    },
    font12: {
        fontSize: 12
    },
    font14: {
        fontSize: 14
    }
})
export default Comment;
