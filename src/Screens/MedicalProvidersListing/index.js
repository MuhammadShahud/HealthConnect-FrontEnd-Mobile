import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, ActivityIndicator, StyleSheet, RefreshControl } from 'react-native';
import { Colors } from '../../Styles';
import { Header, Searchbar } from '../../Components';
import {
  CardiologistIcon,
  DermatologistIcon,
  InternalMedicineIcon,
  medical_provider_1,
  medical_provider_2,
  PsychologistIcon,
} from '../../Assets';
import { style } from './style';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import SubServicesMiddleware from '../../Store/Middleware/SubServicesMiddleware';
import { IMG_URL } from '../../Store/Apis';


const index = () => {

  const navigation = useNavigation();
  const [loader, setLoader] = useState(true);
  const SubServicesState = useSelector(state => state.SubServicesReducer);
  const dispatch = useDispatch();
  const SubServicesData = SubServicesState?.subservices;
  const SubServicesList = SubServicesState?.subservices_list;
  const loading = SubServicesState?.loading;

  useEffect(() => {
    setLoader(true)
    dispatch(SubServicesMiddleware.getSubServices({ name: '' }))
      .then((data) => data ? setLoader(false) : setLoader(false))
      .catch((err) => {
        setLoader(false)
        console.log(err);
      })
  }, [])



  const onPressLoadMore = () => {
    setLoader(true),
      dispatch(SubServicesMiddleware.getSubServices({ next_page_url: SubServicesData.next_page_url }))
        .then((data) => data ? setLoader(false) : setLoader(false))
        .catch(() => setLoader(false))
  };


  const renderLoadMoreButton = () => {
    return SubServicesData.next_page_url ? (
      loader ? (
        <ActivityIndicator
          size={'large'}
          color={'#1D9CD9'}
          style={styles.loadMoreContentContainer}
        />
      ) : (
        <TouchableOpacity
        style={{ width: 110, alignSelf: 'center', marginVertical: 15, backgroundColor: Colors.LIGHT_GREEN, borderRadius: 5  }}
          onPress={onPressLoadMore}>
          <View style={{ alignSelf: 'center' }}>
          <Text style={{color: '#fff', padding: 5,}}>Load more</Text>
          </View>
        </TouchableOpacity>
      )
    ) : null;
  };


  const onRefreshServices = () => {
    setLoader(true),
      dispatch(SubServicesMiddleware.getSubServices({ name: '' }))
        .then((data) => data ? setLoader(false) : setLoader(false))
        .catch(() => setLoader(false));

  };


  const onChangeSearchText = text => {
    clearTimeout(searchTimeout)
    let searchTimeout = setTimeout(() => {
      // console.log(search, text, 'TEXT====>');
      dispatch(SubServicesMiddleware.getSubServices({ name: text }));
    }, 1500)

  };

  const renderMedicalProviders = ({ item }) => {
    // console.log('====',item);
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('Doctors', { item })}
        style={[
          style.categoryCardContainer,
          {
            marginRight: index % 2 == 0 ? 5 : undefined,
            marginLeft: index % 2 !== 0 ? 5 : undefined,
          },
        ]}>
        <Image
          source={{ uri: IMG_URL + item?.image }}
          style={style.bannerImage}
          resizeMode={'stretch'}
        />
        <Text style={style.title}>{item?.sub_service_name}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={style.container}>
      <View style={{ paddingHorizontal: 22 }}>
        <Header headerLeft={true} title={'Medical Providers'} />
      </View>

      <Searchbar onChangeText={onChangeSearchText} />

      {/* <View style={{paddingHorizontal: 12}}> */}
      {!SubServicesData ? (
        <ActivityIndicator
          size={'large'}
          color={'#1D9CD9'}
          style={styles.loadMoreContentContainer}
        />
      ) : null}
      {SubServicesList && SubServicesList?.length ? (
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={loader}
              onRefresh={onRefreshServices}
            />
          }
          contentContainerStyle={{ width: '90%', alignSelf: 'center' }}
          numColumns={2}
          data={SubServicesList}
          renderItem={renderMedicalProviders}
          ListFooterComponent={renderLoadMoreButton}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : null}
      {/* </View> */}
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

export default index;
