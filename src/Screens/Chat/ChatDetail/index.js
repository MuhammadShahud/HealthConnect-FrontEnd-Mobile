import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    FlatList,
    Image,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    TextInput,
    Alert,
    Linking,
    BackHandler
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from '../../../Styles'
import { Header } from '../../../Components'
import ChatBubbleText from '../ChatBubbleText'
import ChatTextInput from '../ChatTextInput'
import { PhoneIcon, videoIcon } from '../../../Assets'
import { useNavigation } from '@react-navigation/native'
import { ChatMiddleware } from '../../../Store/Middleware/ChatMiddleware'
import { useDispatch, useSelector } from 'react-redux'
import { IMG_URL } from '../../../Store/Apis'
import { dummyImage, IS_IOS } from '../../../config'
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ActivityIndicator } from 'react-native-paper'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { createThumbnail } from 'react-native-create-thumbnail'
import ImageView from "react-native-image-viewing";
import VideoPlayer from 'react-native-video-player';
import DocumentPicker from "react-native-document-picker";
import Pusher from 'pusher-js/react-native';
import VideoMiddleware from '../../../Store/Middleware/VideoMiddleware';
import moment from 'moment'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import { style } from '../../CategoryListing/style'
import RNFetchBlob from 'rn-fetch-blob'
import { getHeaders } from '../../../Utils'


const ChatDetail = (props) => {

    const ChatListData = props?.route?.params?.item
    const DocumentData = props?.route?.params?.docData;
    // console.log('HH--->', ChatListData.id);
    const navigation = useNavigation()
    const [loader, setLoader] = useState(true);
    const dispatch = useDispatch();
    const [next_Page_Url, SetNext_Page_Url] = useState(1);
    const [abc, SetAbc] = useState(null);
    const [messages, SetMessages] = useState([]);
    const AuthState = useSelector(state => state.AuthReducer);
    const [uploading, SetUploading] = useState(false);
    const [messageSent, SetMessageSent] = useState(false);
    const [text, SetText] = useState(false);
    const [mediaType, SetMediaType] = useState(null);
    const [image, SetImage] = useState(null);
    const [fileDimension, SetFileDimension] = useState(null);
    const [filterModal, SetFilterModal] = useState(false);
    const [openImage, SetopenImage] = useState([]);
    const [visibleImage, SetvisibleImage] = useState(false);


    // console.log('----chat----', messages);



    useEffect(() => {
        setLoader(true)
        initializePusher();
        getUserMessages();
        fsPermission();
    }, []);

    useEffect(() => {
        if (image)
            sendAttachment();
        console.warn("IMage:", image);
    }, [image])

    useEffect(() => {
        if (DocumentData) {
            ShareReport()
            BackHandler.addEventListener("hardwareBackPress", BackHandlerFunc);
        }
    }, [])

    useEffect(() => {
        return () => {
            if (DocumentData)
                BackHandler.removeEventListener("hardwareBackPress", BackHandlerFunc)
        }
    }, [])


    const BackHandlerFunc = () => {
        navigation.goBack("Laboratory");
        return false
    }


    const ShareReport = () => {

        if (DocumentData?.file) {


            let user_id = null;
            if (ChatListData?.to_user_id) {
                user_id = AuthState.user?.user?.id == ChatListData.to_user_id
                    ? ChatListData.from_user_id
                    : ChatListData.to_user_id

            }
            else {
                user_id = ChatListData.id;
            }
            console.warn("sent_data", {
                userId: user_id,
                message: null,
                report_id: DocumentData?.id,
                type: 'text',
            })
            SetMessageSent(true)
            dispatch(ChatMiddleware.ShareReport({
                userId: user_id,
                message: null,
                report_id: DocumentData?.id,
                type: 'text',
            }))
                .then(data => {
                    if (data) {
                        let msg = {
                            sent_from_id: AuthState.user?.user?.id,
                            sent_to_id: user_id,
                            ...data,
                        };

                        let updateMessage = [msg, ...messages];
                        console.warn("Update MSG4----->", updateMessage);
                       //SetMessages(updateMessage)
                        SetText('')
                        SetMessageSent(false)

                    }
                })
                .catch(err => console.warn('catch ===', err));
        }
    }

    const ShareDocument = () => {

    }


    const initializePusher = () => {

        const user = AuthState.user.user;
        const pusher = new Pusher('7e98153f217f162e0900', { cluster: 'ap2' });
        const channel = pusher.subscribe(`user.${user.id}`);

        channel.bind('App\\Events\\Message', data => {
            if (ChatListData.id == data.message.chatlist_id) {
                let msg = {
                    sent_to_id: user.id,
                    sent_from_id: data.message.sent_from_id,
                    ...data.message,
                };
                //let updateMessage = [msg, ...messages];
                // SetMessages(updateMessage)
                getUserMessages();

            }
        });
    };
    const fsPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,

                {
                    title: "Cool Photo App Camera Permission",
                    message:
                        "Cool Photo App needs access to your camera " +
                        "so you can take awesome pictures.",
                    buttonNeutral: "Ask Me Later",
                    buttonNegative: "Cancel",
                    buttonPositive: "OK"
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("You can use the camera");
            } else {
                console.log("Camera permission denied");
            }
        } catch (err) {
            console.warn(err);
        }
    }

    const DownloadDocument = async (file) => {

        let dirs = RNFetchBlob.fs.dirs
        let headers = (await getHeaders()).documentheaders

        await RNFetchBlob
            .config({
                timeout: 60 * 60,
                fileCache: true,
                path: dirs.DownloadDir + '/' + file,
                addAndroidDownloads: {
                    useDownloadManager: true,
                    notification: true,
                    title: file,
                    path: dirs.DownloadDir + '/' + file,
                },

            })
            .fetch("GET", IMG_URL + file,
                headers,
            )

            .then((res) => {
                console.warn('The file saved to ', res)
                Alert.alert('Note', 'File Downloaded Successfully.');
            }).catch((err) => {
                console.log(err);
            })

    }

    const HandleopenImage = (uri) => {
        //  console.warn("hello");
        SetopenImage([{ uri: uri }]);
        SetvisibleImage(true);
    }
    const getUserMessages = () => {

        if (!ChatListData?.id)
            return;
        //ChatListData);
        dispatch(ChatMiddleware.getAllUserMessages({
            next_url: next_Page_Url,
            id: ChatListData.id,
        }))
            .then(data => {
                //   console.warn('dasdasd', data.data);
                if (data) {
                    console.warn("Update MSG1----->");
                    SetMessages(data?.data?.data)
                    SetAbc(data.next_page_url)

                }
            })
            .catch(err => { });
    };
    const downloadFile = (item) => {

        dispatch(ChatMiddleware.DownloadAttachment({
            selectedItem: item,
        }))
        console.warn('file', IMG_URL + item)
    }
    const callLinking = (phone) => {
        // console.log('heheh', phone);
        let phoneNumber = '';

        if (Platform.OS === 'android') {
            phoneNumber = 'tel:${' + phone + '}';
        }
        else {
            phoneNumber = 'telprompt:${' + phone + '}';
        }

        Linking.openURL(phoneNumber);
    };
    const renderHeaderRight = () => {
        return <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => callLinking(props?.route?.params?.item?.user?.phone_number)}>
                <Image source={PhoneIcon} style={{ width: 22, height: 22, marginRight: 10 }} resizeMode={'contain'} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
                // console.log(props?.route?.params?.item?.from_user_id,'------------' ,props?.route?.params?.item?.to_user_id);
                if(AuthState?.user?.user?.role == 'doctor'){
                     let id = props?.route?.params?.item?.from_user_id ? props?.route?.params?.item?.from_user_id :props?.route?.params?.item?.user?.id
                dispatch(VideoMiddleware.generateToken({
                    id,
                    callback: (data) => {
                        navigation.navigate('VideoCallTest', { call_token: data?.data[0], channelName: data?.data[1], OpponentID: props?.route?.params?.item?.to_user_id ? props?.route?.params?.item?.to_user_id : props?.route?.params?.item?.from_user_id })
                    }
                }))
                }
                else{
                    let id = props?.route?.params?.item?.to_user_id ? props?.route?.params?.item?.to_user_id : props?.route?.params?.item?.user?.id
                    dispatch(VideoMiddleware.generateToken({
                    id,
                    callback: (data) => {
                        navigation.navigate('VideoCallTest', { call_token: data?.data[0], channelName: data?.data[1], OpponentID: props?.route?.params?.item?.from_user_id })
                    }
                }))
                }                
            }
            }>
                <Image source={videoIcon} style={{ width: 22, height: 22 }} resizeMode={'contain'} />
            </TouchableOpacity>
        </View>
    }
    const renderMessages = ({ item }) => {
        //console.warn('item', AuthState.user?.user)
        let doc = item?.report?.file ? item?.report?.file.split(".") : []
        let extension = doc? doc[1] : ""
        return (
            <View
                style={{
                    marginVertical: 12,
                    flexDirection:
                        item?.sent_from_id == AuthState.user?.user?.id ? 'row-reverse' : 'row',
                    alignItems: 'center',
                }}>
                <View
                    style={{
                        paddingHorizontal: 10,
                    }}>
                    <Image
                        source={{
                            uri:
                                item?.sent_from_id == AuthState.user?.user?.id
                                    ? AuthState.user?.user?.profile_pic == null ? dummyImage : IMG_URL + AuthState.user?.user?.profile_pic : item?.sent_from.profile_pic == null ? dummyImage
                                        : IMG_URL + item?.sent_from.profile_pic
                        }}
                        style={styles.userImg}
                    />
                </View>

                <View
                    style={{
                        width: '60%',
                        backgroundColor:
                            item?.sent_from_id == AuthState.user?.user?.id ? '#eeee' : '#ddd',
                        padding: 20,
                        borderRadius: 5,
                    }}>
                    <Text style={{ fontWeight: 'bold', color: 'black' }}>
                        {/* {item?.sent_from_id == AuthState.user.id ? 'Me' : props.route.params?.item?.fromusername} : */}
                        {item?.sent_from_id == AuthState.user?.user?.id ? 'Me' : props.route.params?.item?.from_user?.id == AuthState.user?.user?.id ?
                            props.route.params?.item?.to_user?.username : props.route.params?.item?.from_user?.username} :
                    </Text>
                    {item?.type == 'text' && !item?.report ? (
                        <Text
                            // onPress={() => {
                            //     Linking.canOpenURL(item?.message).then(supported => {
                            //         if (supported) {
                            //             Linking.openURL(item?.message);
                            //         } else {
                            //             console.log("Don't know how to open URI: " + item?.message);
                            //         }
                            //     });
                            // }}
                            style={{
                                textAlign:
                                    item?.sent_from_id == AuthState.user?.user?.id ? 'right' : 'left',
                                color: '#636060',
                            }}>
                            {item?.message}
                        </Text>
                    ) : (
                        item?.report ? (
                            <View style={{ ...style.historyContainer, width: "100%" }}>
                                {/* <Image source={item.image} style={{ width: '100%', height: 200 }} /> */}
                                <View style={{ width: '100%', height: 200, alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: Colors.RED }}>{extension}</Text>
                                </View>

                                <View
                                    style={{
                                        width: '60%',
                                        height: 35,
                                        backgroundColor: 'rgba(0,0,0,0.6)',
                                        position: 'absolute',
                                        flexDirection: 'row',
                                        justifyContent: 'space-evenly'
                                    }}>

                                    <TouchableOpacity
                                        onPress={() => DownloadDocument(item?.report?.file)}
                                        style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                        <Feather name="download" color={Colors.WHITE} size={22} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ) :
                            (
                                item?.image == '1' ?
                                    <TouchableOpacity
                                        onPress={() => HandleopenImage(IMG_URL + item?.media)}
                                    >
                                        <Image
                                            source={{
                                                uri:
                                                    IMG_URL + item?.media
                                            }}
                                            style={styles.chatImg} resizeMode='contain'
                                        />
                                    </TouchableOpacity>
                                    :
                                    item?.image == '0' ?
                                        <VideoPlayer
                                            video={{ uri: IMG_URL + item?.media }}
                                            //autoplay
                                            videoWidth={500}
                                            videoHeight={220}
                                            resizeMode={'contain'}
                                            // paused={!screenIsFocused}
                                            style={{
                                                height: 100,
                                                width: '100%',
                                                borderRadius: 6,
                                                resizeMode: 'contain',
                                                alignSelf: 'center',
                                                justifyContent: 'center'
                                            }}
                                            // disableSeek
                                            thumbnail={{ uri: IMG_URL + item?.thumbnail }}
                                        />
                                        :
                                        <>
                                            {item?.image == '3' ?
                                                <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    <Text>{item?.media}</Text>
                                                    <TouchableOpacity onPress={() => downloadFile(item?.media)}>
                                                        <Entypo name={'download'} size={18} color={'#1872ea'} />
                                                    </TouchableOpacity>
                                                </View>
                                                :
                                                null}
                                        </>
                            )
                    )
                    }

                    <Text
                        style={{
                            textAlign:
                                item?.sent_from_id == AuthState?.user?.user?.id ? 'right' : 'left',
                            color: '#636060',
                            fontSize: 9,
                        }}>
                        {moment(item?.created_at).format('hh:mm A')}
                    </Text>
                </View>
            </View>
        );
    };
    const renderLoaderMoreButton = () => {


        return abc ? (
            loader ? (
                <ActivityIndicator
                    size={'large'}
                    color={'#1D9CD9'}
                    style={styles.loadMoreContentContainer}
                />
            ) : (
                <TouchableOpacity
                    style={{ width: 110, alignSelf: 'center', marginVertical: 13 }}
                    onPress={onPressLoadMore}>
                    <View style={styles.loadMoreContainer}>
                        <Text style={styles.loadMoreText}>Load more</Text>
                    </View>
                </TouchableOpacity>
            )
        ) : null;
    };
    const onPressLoadMore = () => {
        setLoader(true), () => {
            console.warn('next_Page_Url', next_Page_Url + 1);
            dispatch(ChatMiddleware.getAllUserMessages({
                next_url: next_Page_Url + 1,
                id: ChatListData.id,
            }))
                .then((data) => {
                    setLoader(false)
                    SetNext_Page_Url(next_Page_Url + 1)
                    console.warn("Update MSG2----->", messages);
                    SetMessages([...messages, ...data.data])
                }
                )
                .catch(() => setLoader(false));
        }
    };
    const sendAttachment = async () => {

        let user_id = AuthState.user.user.id == ChatListData.to_user_id
            ? ChatListData.from_user_id
            : ChatListData.to_user_id

        let thumb = null;
        if (!image) {
            Alert.alert('Warning', 'Please select image/video!');
        }
        else {

            if (image.type.includes("video")) {
                let thumbnail = await createThumbnail({
                    url: image.uri
                })
                let thumb_name_array = thumbnail.path.split("/");
                let thumb_name = thumb_name_array[thumb_name_array.length - 1]

                thumb = {
                    name: thumb_name,
                    type: thumbnail?.mime,
                    uri: thumbnail?.path,
                    size: thumbnail?.size
                }

            }


            let userData = {
                media: image,
                type: mediaType,
                ...thumb ? { thumbnail: thumb } : { thumbnail: null }
            }
            SetUploading(true)
            dispatch(ChatMiddleware.SendAttachment({
                userId: user_id,
                userData,
                uploading: (sent, total) => {
                    console.warn('sent', sent, 'total', total);
                },
                callback: (data) => {
                    if (data) {

                        SetUploading(false)
                        getUserMessages();
                    }
                }
            }))


        }
    };

    const selectImage = () => {
        Alert.alert("Select", "Please select an option", [
            {
                text: "Cancel",
            },
            {
                text: "Camera",
                onPress: () => {
                    try {
                        launchCamera({
                            mediaType: 'mixed'
                        }, (response) => {

                            if (!response.errorCode && !response.didCancel) {
                                let img = response.assets[0];
                                let mediaType = img?.type
                                if (mediaType.includes('image')) {
                                    SetMediaType(1)

                                }
                                if (mediaType.includes('video')) {
                                    SetMediaType(0)
                                }
                                SetImage({
                                    uri: img.uri,
                                    name: img.fileName,
                                    size: img.fileSize,
                                    type: img.type

                                })
                                SetFileDimension({
                                    height: img.height,
                                    width: img.width
                                }
                                )
                            } else if (response.didCancel) {
                                console.warn("error", response);
                            }
                        })
                    } catch (error) {
                        console.warn("error", error);
                    }
                }
            },
            {
                text: "Library",
                onPress: () => {
                    try {
                        launchImageLibrary({
                            mediaType: 'mixed'
                        }, (response) => {
                            console.warn("Responce:", response);
                            if (!response.errorCode && !response.didCancel) {
                                let img = response.assets[0];

                                let mediaType = img?.type
                                if (mediaType.startsWith('image')) {
                                    SetMediaType(1)

                                }
                                if (mediaType.startsWith('video')) {
                                    SetMediaType(0)
                                }
                                SetImage({
                                    uri: img.uri,
                                    name: img.fileName,
                                    size: img.fileSize,
                                    type: img.type
                                })
                                SetFileDimension({
                                    height: img.height,
                                    width: img.width
                                }
                                )

                                SetFilterModal(true)


                            } else if (response.didCancel) {
                                console.warn('error', response);
                            }
                        })
                    } catch (error) {
                        console.warn('error', error);
                    }
                }
            },
        ])
    }

    const pickDocument = async () => {
        let document = await DocumentPicker.pick({
            presentationStyle: 'fullScreen',
            transitionStyle: 'coverVertical',
            allowMultiSelection: false,
            type: IS_IOS ? "public.item" : "*/*"
            // type:"*/*"
        })
        let doc = document[0]
        SetImage({
            uri: doc?.uri,
            name: doc?.name,
            size: doc?.size,
            type: doc?.type
        })
        SetMediaType(3)
        console.log('====================================');
        console.log("Document", doc);
        console.log('====================================');
    }
    const sendMessage = () => {

        if (text) {


            let user_id = null;
            if (ChatListData?.to_user_id) {
                user_id = AuthState.user?.user?.id == ChatListData.to_user_id
                    ? ChatListData.from_user_id
                    : ChatListData.to_user_id

            }
            else {
                user_id = ChatListData.id;
            }
            SetMessageSent(true)
            dispatch(ChatMiddleware.SendMessage({
                userId: user_id,
                message: text,
                type: 'text',
            }))
                .then(data => {
                    if (data) {
                        let msg = {
                            sent_from_id: AuthState.user?.user?.id,
                            sent_to_id: user_id,
                            ...data,
                        };

                        let updateMessage = [msg, ...messages];
                        console.warn("Update MSG4----->", updateMessage);
                        SetMessages(updateMessage)
                        SetText('')
                        SetMessageSent(false)

                    }
                })
                .catch(err => console.warn('catch ===', err));
        }
    };

    return (

        <View style={styles.container}>
            <Header headerLeft={true} title={ChatListData?.fromusername}
                headerRight={renderHeaderRight()}
            />
            <View style={{ flex: 1 }}>
                <FlatList
                    inverted={true}
                    data={messages}
                    renderItem={renderMessages}
                    keyExtractor={(item, index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                    ListFooterComponent={renderLoaderMoreButton}
                />
            </View>

            <KeyboardAvoidingView style={{}} behavior={Platform.OS === 'ios' ? 'padding' : null}>



                <View style={styles.footer}>

                    {uploading ?
                        <ActivityIndicator
                            size={'small'} color={'#1872ea'}
                        /> : <TouchableOpacity onPress={selectImage} style={{ marginLeft: 10 }}>
                            <Entypo name={'image'} size={22} color={'#1872ea'} />
                        </TouchableOpacity>
                    }
                    {uploading ?
                        <ActivityIndicator
                            size={'small'} color={'#1872ea'}
                        /> : <TouchableOpacity onPress={pickDocument} style={{ marginLeft: 10 }}>
                            <Entypo name={'attachment'} size={22} color={'#1872ea'} />
                        </TouchableOpacity>
                    }
                    {/* )} */}
                    <TextInput
                        value={text}
                        onChangeText={text => SetText(text)}
                        placeholder="Type something"
                        placeholderTextColor={'#8D8D8D'}
                        style={styles.input}
                    />

                    {messageSent ?
                        <ActivityIndicator
                            size={'small'} color={'#1872ea'}
                        /> :
                        <TouchableOpacity
                            onPress={sendMessage}
                            style={{ paddingHorizontal: 10 }}>
                            {/* <Image
                source={require('../../assets/send.png')}
                style={{ width: 22, height: 22 }}
              /> */}
                            <Ionicons name={'send'} size={22} color={'#1872ea'} />
                        </TouchableOpacity>
                    }
                </View>

                {/* <ChatTextInput /> */}
            </KeyboardAvoidingView>
            <ImageView
                images={openImage}
                imageIndex={0}
                visible={visibleImage}
                onRequestClose={() => {
                    SetvisibleImage(false)
                    SetopenImage([]);
                }}
            />
        </View>
    )
}

export default ChatDetail

const styles = StyleSheet.create({
    container: {
        flex: 1, paddingHorizontal: 20, backgroundColor: Colors.WHITE
    },
    input: { flex: 1, paddingLeft: 14, color: '#636060', paddingVertical: IS_IOS ? 15 : 10 },
    userImg: { width: 55, height: 55, borderRadius: 50 },
    msgDay: {
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#000',
        fontSize: 16,
    },
    footer: {
        paddingVertical: 4,
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: '#8D8D8D',
        alignItems: 'center',
        marginBottom: IS_IOS ? 10 : 0,

    },
    chatImg: { width: 100, height: 100, },

})