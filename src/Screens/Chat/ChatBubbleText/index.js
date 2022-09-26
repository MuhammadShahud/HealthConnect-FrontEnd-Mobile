import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { Colors } from '../../../Styles'
import { banner_image, doctorImg, heart_icon } from '../../../Assets'

const ChatBubbleText = ({ position, text, type }) => {

    const renderTextMessage = () => {
        return (position == 'left' ? (<View>
            <Text style={styles.leftText}>{text}</Text>
            <Text style={styles.leftMessageStatus}>Delivered</Text>
        </View>) : (<View style={{
            backgroundColor: Colors.BG_GRAY,
            paddingHorizontal: 10, paddingVertical: 15, borderRadius: 10,
            borderTopLeftRadius: 0, maxWidth: '90%',
        }}>
            <Text style={{
                alignSelf: 'flex-start',
                color: Colors.DARK_GRAY,
                fontSize: 14
            }}>{text}
            </Text>
            <View style={{
                elevation: 4, position: 'absolute', right: -10, top: -10,
                backgroundColor: Colors.WHITE, borderRadius: 50,
                justifyContent: 'center', alignItems: 'center',
                width: 25, height: 25
            }}>
                <Image source={heart_icon} style={{ width: 13, height: 13, marginLeft: 2, marginTop: 2 }} resizeMode={'contain'} />
            </View>
        </View>))
    }

    const renderImageMessage = () => {
        return (
            <Image
                source={banner_image}
                style={[styles.imageMsg, {
                    alignSelf: position === 'right' ? 'flex-end' : 'flex-start'
                }]}
                resizeMode={'stretch'}
            />
        )
    }
    return (
        <View style={styles.container}>
            {type == 'text' ? renderTextMessage() : null}
            {type == 'image' ? renderImageMessage() : null}
        </View>

    )
}

export default ChatBubbleText

const styles = StyleSheet.create({
    container: {
        marginVertical: 5
    },
    leftText: {
        alignSelf: 'flex-end', color: Colors.WHITE, backgroundColor: Colors.LIGHT_GREEN, paddingHorizontal: 10, paddingVertical: 15, borderRadius: 10, borderTopRightRadius: 0, maxWidth: '90%'
    },
    leftMessageStatus: {
        alignSelf: 'flex-end', fontSize: 14, color: Colors.LIGHT_GRAY, marginVertical: 5
    },
    imageMsg: {
        width: 150, height: 250, borderRadius: 5,
    }
})