import {StyleSheet} from 'react-native';
import {Colors} from '../../Styles';

export const style = StyleSheet.create({
  inputContainer: {
    width: '90%',
    borderWidth: 1,
    borderRadius: 12,
    borderColor: Colors.LIGHT_GREEN,
    justifyContent: 'space-between',
    marginVertical: 7,
    height: 45,
    flexDirection:'row',
    alignItems: 'center',
  },
});
