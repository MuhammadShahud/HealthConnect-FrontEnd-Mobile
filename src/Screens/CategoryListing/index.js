import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import {
  banner_image,
  ReportFour,
  ReportOne,
  ReportThree,
  ReportTwo,
} from '../../Assets';
import { Header, Searchbar, SubmitButton, Text } from '../../Components';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import { Colors } from '../../Styles';
import { style } from './style';
import LabReportsMiddleware from '../../Store/Middleware/LabReportsMiddleware';
import { useDispatch, useSelector } from 'react-redux';

const report = [
  { image: ReportOne },
  { image: ReportTwo },
  { image: ReportThree },
  { image: ReportFour },
  { image: ReportFour },
];

const CategoryListing = props => {

  const tab = props.route?.params?.tab;
  const [activeButton, setActiveButton] = useState(tab ? tab : 'laboratory');
  const [reports, setReport] = useState(report);
  const AuthState = useSelector(state => state.AuthReducer);
  const navigation = useNavigation();
  const [loader, setLoader] = useState(true);
  const LabReportsState = useSelector(state => state.LabReportsReducer);
  const dispatch = useDispatch();
  const labreportsData = LabReportsState?.labreport;
  const labreportsDataList = LabReportsState?.labreport_list;

  useEffect(() => {
    dispatch(LabReportsMiddleware.getLabReports({ name: '' }))
        .then((data) => data ? setLoader(false) : setLoader(false))
        .catch(() => setLoader(false))
}, []);

  const onPressLoadMore = () => {
    setLoader(true),
        dispatch(LabReportsMiddleware.getLabReports({ next_page_url: labreportsData.next_page_url }))
            .then((data) => data ? setLoader(false) : setLoader(false))
            .catch(() => setLoader(false))
};


const renderLoaderMoreButton = () => {
  return labreportsData.next_page_url ? (
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
              <View style={styles.loadMoreContainer}>
              <Text style={{color: '#fff', padding: 5,}}>Load more</Text>
              </View>
          </TouchableOpacity>
      )
  ) : null;
};


const onRefreshServices = () => {
  setLoader(true),
      dispatch(LabReportsMiddleware.getLabReports({ name: '' }))
          .then((data) => data ? setLoader(false) : setLoader(false))
          .catch(() => setLoader(false));

};

  const renderCategoryCard = ({ item, index }) => {
    return (
      <View
        style={[
          styles.categoryCardContainer,
          {
            marginRight: index % 2 == 0 ? 5 : undefined,
            marginLeft: index % 2 !== 0 ? 5 : undefined,
          },
        ]}>
        <Image
          source={item.image}
          style={styles.bannerImage}
          resizeMode={'stretch'}
        />
        <Text
          style={styles.title}>{`${item.name}`}</Text>
        {/* <Text style={styles.categoryDistance}>{item.number} miles</Text> */}
        <SubmitButton
          onPress={() =>
            navigation.navigate('CategoryDetail', {
              headerTitle: props?.route.params.headerTitle,
            })
          }
          text={'Directions'}
          buttonContainer={styles.buttonContainer}
          textStyle={styles.FS13}
        />
      </View>
    );
  };

  const renderReports = ({ item }) => {
    return (
      <View style={style.historyContainer}>
        {/* <Text>dsad</Text> */}
        <Image source={item.image} style={{ width: '100%', height: 200 }} />

        <View
          style={{
            width: '50%',
            height: 35,
            backgroundColor: 'rgba(0,0,0,0.6)',
            position: 'absolute',
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Feather name="download" color={Colors.WHITE} size={22} />
          </TouchableOpacity>

          <TouchableOpacity
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <MaterialCommunityIcons
              name="share"
              color={Colors.WHITE}
              size={22}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={style.container}>
      <View style={styles.PH22}>
        <Header headerLeft={true} title={props?.route.params.headerTitle} />
      </View>

      {AuthState.userRole === 'patient' &&
        props?.route.params.headerTitle == 'Laboratory' ? (
        <View style={style.buttonContainer}>
          <TouchableOpacity
            onPress={() => setActiveButton('laboratory')}
            style={[
              style.button,
              {
                backgroundColor:
                  activeButton === 'laboratory'
                    ? Colors.LIGHT_GREEN
                    : Colors.GRAY,
              },
            ]}>
            <Text style={{ color: Colors.WHITE }}>Laboratory</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setActiveButton('report')}
            style={[
              style.button,
              {
                backgroundColor:
                  activeButton === 'report' ? Colors.LIGHT_GREEN : Colors.GRAY,
              },
            ]}>
            <Text style={{ color: Colors.WHITE }}>My Reports</Text>
          </TouchableOpacity>
        </View>
      ) : null}

      {activeButton === 'laboratory' ? <Searchbar /> : null}

      <ScrollView style={styles.listContainer}>
        <FlatList
          numColumns={2}
          data={
            activeButton === 'laboratory' ? props.route.params?.data : reports
          }
          renderItem={
            activeButton === 'laboratory' ? renderCategoryCard : renderReports
          }
          keyExtractor={(item, index) => index.toString()}
        />
      </ScrollView>

      {activeButton === 'report' ? (
        <View>
          <SubmitButton
            onPress={() => navigation.navigate('AddReport')}
            text={'Add New Lab Report'}
            buttonContainer={[styles.buttonContainer, { paddingVertical: 16 }]}
          />

          {/* const renderCategoryCard = ({ index }) => {
        return (
            <View style={[styles.categoryCardContainer, {
                marginRight: index % 2 == 0 ? 5 : undefined,
                marginLeft: index % 2 !== 0 ? 5 : undefined,

            }]}>
                <Image source={banner_image} style={styles.bannerImage} resizeMode={'stretch'} />
                <Text style={styles.title}>ABC Laboratory</Text>
                <Text style={styles.categoryDistance}>7 miles</Text>
                <SubmitButton
                    onPress={() => navigation.navigate('CategoryDetail')}
                    text={'Directions'}
                    buttonContainer={styles.buttonContainer}
                    textStyle={styles.FS13}
                />

            </View>
        )
    } */}
        </View>
      ) : null}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  FS13: {
    fontSize: 13,
  },
  bannerImage: {
    height: 120,
    width: '100%',
  },
  PH22: {
    paddingHorizontal: 22,
  },
  categoryDistance: {
    color: Colors.BLACK,
    fontSize: 10,
    marginLeft: 5,
  },
  title: {
    color: Colors.BLACK,
    marginVertical: 5,
    marginLeft: 5,
  },
  listContainer: {
    paddingHorizontal: 20,
    maorginTp: 10,
  },
  categoryCardContainer: {
    flex: 1,
    backgroundColor: Colors.BG_GRAY,
    marginVertical: 10,
    elevation: 1,
  },
  buttonContainer: {
    paddingVertical: 7,
    width: '95%',
    borderRadius: 5,
    backgroundColor: Colors.LIGHT_GREEN,
  },
  loadMoreContentContainer: {
    justifyContent: 'center',
    alignSelf: 'center',
    width: 120,
    marginVertical: 20,
},
});

export default CategoryListing;
