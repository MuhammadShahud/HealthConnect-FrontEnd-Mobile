import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '../../../Styles'
import { CameraIcon, file_icon, file_square, folder_icon } from '../../../Assets'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'

const ChatTextInput = () => {
    const [isShowAttachmemntView, setIsShowAttachmemntView] = useState(false)
    const navigation = useNavigation()
    const AuthState = useSelector(state => state.AuthReducer);

    const renderAttachmentUI = () => {
        return <View style={{ height: 180, backgroundColor: Colors.LIGHT_GREEN, marginHorizontal: -20, borderTopRightRadius: 25, borderTopLeftRadius: 25 }}>
            <Text style={{ textAlign: 'center', color: Colors.WHITE, fontWeight: 'bold', fontSize: 18, paddingVertical: 10 }}>{AuthState.userRole !== 'patient' ? 'Upload Image' : 'Upload Lab Report'}</Text>
            {AuthState.userRole !== 'patient' ? (<View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                <View style={{ alignItems: 'center' }}>
                    <View style={{ backgroundColor: Colors.WHITE, width: 70, height: 70, borderRadius: 100, justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={CameraIcon} style={{ width: 30, height: 30 }} resizeMode={'contain'} />
                    </View>
                    <Text style={{ textAlign: 'center', color: Colors.WHITE, fontWeight: 'bold', fontSize: 18, paddingVertical: 10 }}>Use Camera</Text>
                </View>
                <View style={{ alignItems: 'center' }}>
                    <View style={{ backgroundColor: Colors.WHITE, width: 70, height: 70, borderRadius: 100, justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={file_square} style={{ width: 30, height: 30 }} resizeMode={'contain'} />
                    </View>
                    <Text style={{ textAlign: 'center', color: Colors.WHITE, fontWeight: 'bold', fontSize: 18, paddingVertical: 10 }}>Browse Image</Text>
                </View>
            </View>) : (<View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                <TouchableOpacity onPress={() => navigation.navigate('CategoryListing', { tab: 'report', headerTitle: 'Laboratory' })} style={{ alignItems: 'center' }}>
                    <View style={{ backgroundColor: Colors.WHITE, width: 70, height: 70, borderRadius: 100, justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={folder_icon} style={{ width: 30, height: 30 }} resizeMode={'contain'} />
                    </View>
                    <Text style={{ textAlign: 'center', color: Colors.WHITE, fontWeight: 'bold', fontSize: 18, paddingVertical: 10 }}>Select Report</Text>
                </TouchableOpacity>
                <View style={{ alignItems: 'center' }}>
                    <View style={{ backgroundColor: Colors.WHITE, width: 70, height: 70, borderRadius: 100, justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={file_square} style={{ width: 30, height: 30 }} resizeMode={'contain'} />
                    </View>
                    <Text style={{ textAlign: 'center', color: Colors.WHITE, fontWeight: 'bold', fontSize: 18, paddingVertical: 10 }}>Upload Report</Text>
                </View>
            </View>)}
        </View>

    }

    return (
        <>
            {isShowAttachmemntView && renderAttachmentUI()}
            <View style={styles.container}>
                <TextInput style={[styles.PH15,{ }]} placeholder='Type your message...' />
                <TouchableOpacity onPress={() => setIsShowAttachmemntView(!isShowAttachmemntView)}>
                    <Image source={file_icon} style={styles.fileIcon} resizeMode={'contain'} />
                </TouchableOpacity>
            </View>
        </>
    )
}


export default ChatTextInput

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.BG_GRAY, borderRadius: 10, flexDirection: 'row',
        alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20,
        marginBottom: 5,
    },
    PH15: {
        paddingVertical: 15
    },
    fileIcon: {
        width: 20, height: 20
    }

})