import {StyleSheet} from 'react-native';
import {Colors} from '../../Styles';

export const style = StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.WHITE},
  categoryCardContainer: {
    flex: 1,
    backgroundColor: Colors.BG_GRAY,
    marginVertical: 8,
    elevation: 1,
  },
  bannerImage: {
    height: 120,
    width: '100%',
  },
  title: {
    color: Colors.BLACK,
    marginVertical: 5,
    marginLeft: 5,
  },
  listContainer: {
    width: '90%',
    flexDirection: 'row',
    alignSelf: 'center',
    paddingVertical: 8,
    paddingHorizontal: 8,
    backgroundColor: Colors.BG_GRAY,
    marginVertical: 8,
    borderRadius: 8,
    elevation: 1,
    alignItems: 'center',
  },
  image: {width: 55, height: 55, borderRadius: 100},
  cancelButton: {
    backgroundColor: Colors.LIGHT_GREEN,
    marginVertical: 8,
    borderRadius: 6,
  },
  buttonText: {
    fontSize: 8,
    fontWeight: 'bold',
    color: Colors.WHITE,
    paddingVertical: 11,
    paddingHorizontal: 10,
  },
  topContainer: {
    width: '70%',
    alignSelf: 'center',
    marginVertical: 14,
    paddingVertical: 8,
    alignItems: 'center',
  },
  expText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000'
  },
  iconContainer: {
    flexDirection: 'row',
    marginVertical: 18,
    justifyContent: 'space-between',
  },
  iconButton: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  lineContainer: {
    width: 100,
    height: 10,
    alignSelf: 'center',
    backgroundColor: Colors.BG_GRAY,
  },
  mapView: {
    height: 130,
    marginBottom: 10,
  },
  bottomContainer: {width: '90%', alignSelf: 'center', marginVertical: 12},
  title: {fontSize: 16, fontWeight: 'bold', color: Colors.BLACK},

  userContainer: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginVertical: 3,
    backgroundColor: Colors.BG_GRAY,
    flexDirection: 'row',
    alignItems: 'center',
  },
  userSubContainer: {
    flex: 1,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userimage: {
    width: 50,
    height: 50,
    borderRadius: 100,
  },
  name: {
    fontSize: 16,
    color: Colors.BLACK,
    fontWeight: 'bold',
  },
  buttonContainer: {
    width: '90%',
    alignSelf: 'center',
    // position: 'absolute',
    // bottom: 0,
    marginBottom: 10,
    backgroundColor: Colors.LIGHT_GREEN,
  },
  textStyle: {
    color: Colors.WHITE,
  },
});
