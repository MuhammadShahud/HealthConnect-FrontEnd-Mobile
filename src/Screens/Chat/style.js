import {StyleSheet} from 'react-native';
import {Colors} from '../../Styles';

export const style = StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.WHITE},
  chatListButton: {
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    marginVertical: 8,
    paddingVertical: 10,
    backgroundColor: Colors.BG_GRAY,
    elevation: 1,
    borderRadius: 6,
    alignItems: 'center',
    padding: 5,
  },
  image: {width: 55, height: 55, borderRadius: 100},
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.BLACK,
  },
  countContainer: {
    right: 0,
    width: 24,
    height: 26,
    marginRight: -10,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    backgroundColor: Colors.LIGHT_GREEN,
  },
});
