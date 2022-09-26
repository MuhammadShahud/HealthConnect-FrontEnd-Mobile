import {StyleSheet} from 'react-native';
import {Colors} from '../../Styles';

export const style = StyleSheet.create({
  headerContainer: {
    alignSelf: 'center',
    height: 55,
    flexDirection: 'row',
  },
  headerLeftContainer: {
    flex: 0.13,
    flexDirection: 'row',
  },
  headerRightContainer: {
    flex: 0.22,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerBtn: {
    justifyContent: 'center',
    flex: 1,
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    // marginHorizontal: 18,
  },
  headerTitle: {
    fontSize: 20,
    color: Colors.BLACK,
    fontWeight: 'bold',
  },
});
