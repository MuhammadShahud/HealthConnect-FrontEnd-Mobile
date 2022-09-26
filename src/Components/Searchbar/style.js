import {StyleSheet} from 'react-native';
import {Colors} from '../../Styles';

export const style = StyleSheet.create({
  inputContainerStyle: {
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
    backgroundColor: Colors.WHITE,
    elevation: 5,
    borderWidth: 1,
    borderColor: Colors.BG_GRAY,
    shadowOffset: {width: 0, height: 2,},
    shadowOpacity: 0.1,

  },
  inputContainer: {
    borderWidth: 0,
    borderRadius: 0,
    marginVertical: 0,
  },
  searchContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.LIGHT_GREEN,
  },
  inputStyle: {
    paddingHorizontal: 10,
    color: '#000',
    width: '100%'
  },
});
