import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from '../../Components'
import { Colors } from '../../Styles';
import { avatar } from '../../Utils';


const Post = ({ user, post, onPress }) => {

    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <View style={styles.postContainer}>
                <Image source={{ uri: avatar }}
                    style={styles.avatar} />
                <View style={styles.userContainer}>
                    <View style={styles.userNameContainer}>
                        <Text style={styles.userName}>{user?.name}</Text>
                        <View style={styles.userConnectLevel} />
                        <Text>2nd </Text>
                    </View>
                    <Text>{user?.email}</Text>
                </View>
            </View>
            <View style={styles.postBody}>
                <Text>{post?.body}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.WHITE, marginVertical: 5, padding: 15,
    },
    postContainer: {
        flexDirection: 'row'
    },
    avatar: {
        width: 50, height: 50, borderRadius: 100
    },
    userContainer: {
        flex: 1, justifyContent: 'center',
        paddingHorizontal: 10
    },
    userNameContainer: {
        flexDirection: 'row', alignItems: 'center'
    },
    userConnectLevel: {
        width: 5, height: 5,
        backgroundColor: Colors.GRAY, borderRadius: 10, marginHorizontal: 8
    },
    postBody: {
        paddingVertical: 5
    },
    userName: { fontWeight: 'bold', fontSize: 16 }
})
export default Post;
