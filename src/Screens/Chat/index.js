import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, ActivityIndicator, RefreshControl, TouchableOpacity } from 'react-native';
import { Colors } from '../../Styles';
import { Header, Searchbar } from '../../Components';
import { doctorImg, FemaleDoctorImg, MaleDoctorImg } from '../../Assets';
import ChatlistItem from './Chatlist';
import { style } from './style';
import { useNavigation } from '@react-navigation/native';
import { IMG_URL } from '../../Store/Apis';
import { useDispatch, useSelector } from 'react-redux';
import ChatIndexMiddleware from '../../Store/Middleware/ChatIndexMiddleware';
import moment from 'moment';


const Chat = (props) => {
  const [search, setSearch] = useState('');
  const [chat, setChat] = useState([]);
  const navigation = useNavigation()

  const [loader, setLoader] = useState(true);
  const ChatIndexState = useSelector(state => state.ChatIndexReducer);
  const dispatch = useDispatch();
  const ChatIndexData = ChatIndexState?.chat_index;
  const ChatIndexList = ChatIndexState?.chat_index_list;
  const loading = ChatIndexState?.loading;
  const AuthState = useSelector(state => state.AuthReducer);
  const DocumentData = props?.route?.params
  useEffect(() => {
    setLoader(true)
    dispatch(ChatIndexMiddleware.getChatIndex({ name: '' }))
      .then((data) => data ? setLoader(false) : setLoader(false))
      .catch((err) => {
        setLoader(false)
        console.log(err);
      })
  }, []);


  // console.log('---Index--->',props?.route?.params);


  const onPressLoadMore = () => {
    setLoader(true),
      dispatch(ChatIndexMiddleware.getChatIndex({ next_page_url: ChatIndexData.next_page_url }))
        .then((data) => data ? setLoader(false) : setLoader(false))
        .catch(() => setLoader(false))
  };


  const renderLoaderMoreButton = () => {
    return ChatIndexData.next_page_url ? (
      loader ? (
        <ActivityIndicator
          size={'large'}
          color={'#1D9CD9'}
          style={styles.loadMoreContentContainer}
        />
      ) : (
        <TouchableOpacity
          style={{ width: 110, alignSelf: 'center', marginVertical: 15 }}
          onPress={onPressLoadMore}>
          <View style={{ alignSelf: 'center' }}>
            <Text style={{ textAlign: 'center' }}>Load more</Text>
          </View>
        </TouchableOpacity>
      )
    ) : null;
  };


  const onRefreshServices = () => {
    setLoader(true),
      dispatch(ChatIndexMiddleware.getChatIndex({ name: '' }))
        .then((data) => data ? setLoader(false) : setLoader(false))
        .catch(() => setLoader(false));

  };


  const onChangeSearchText = text => {
    clearTimeout(searchTimeout)
    let searchTimeout = setTimeout(() => {
      // console.log(search, text, 'TEXT====>');
      dispatch(ChatIndexMiddleware.getChatIndex({ name: text }))
    }, 1500)

  };


  const renderChats = ({ item }) => {
    const { user } = AuthState?.user
    // console.warn('itemm ======', item);
    let user_to_use = null
    if (user?.id == item.from_user_id) {
      user_to_use = item.to_user
    } else {
      user_to_use = item.from_user
    }
    // console.log("user_to_useuser_to_useuser_to_use--->", user_to_use)
    return (
      <ChatlistItem
        name={item?.fromusername}
        time={moment(item?.last_message?.time).fromNow()}
        msgCount={item?.message_count}
        image={item?.to_user?.profile_pic}
        onPress={() =>{ DocumentData ?
          navigation.navigate('ChatDetail', { item: item , docData: DocumentData })
          :
          navigation.navigate('ChatDetail', { item })
        }}
      />
    );
  };
  return (
    <View style={style.container}>
      <View style={{ paddingHorizontal: 22 }}>
        <Header title={'Chat'} />
      </View>
      <Searchbar onChangeText={onChangeSearchText} />
      {!ChatIndexData ? (
        <ActivityIndicator
          size={'large'}
          color={'#1D9CD9'}
          style={styles.loadMoreContentContainer}
        />
      ) : null}
      {ChatIndexList && ChatIndexList?.length ? (
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={loader}
              onRefresh={onRefreshServices}
            />
          }
          data={ChatIndexList}
          renderItem={renderChats}
          ListFooterComponent={renderLoaderMoreButton}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : null}
    </View>
  );
};


const styles = StyleSheet.create({
  loadMoreContentContainer: {
    justifyContent: 'center',
    alignSelf: 'center',
    width: 120,
    marginVertical: 20,
  },
});

export default Chat;
