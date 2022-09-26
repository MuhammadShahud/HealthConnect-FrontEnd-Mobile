import {StyleSheet} from 'react-native';
import {Colors} from '../../Styles';

export const style = StyleSheet.create({
  modalContainer: {
    width: '90%',
    height: 300,
    alignSelf: 'center',
    backgroundColor: Colors.WHITE,
  },
  modalTitle: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.BLACK,
  },
  inputContainer: {
    width: '100%',
    alignItems: 'center',
  },
  input: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    color: '#000',
    width: '100%'
  },
  button: {
    width: '90%',
    paddingVertical: 18,
    marginVertical: 6,
    backgroundColor: Colors.LIGHT_GREEN,
    alignSelf: 'center',
    borderRadius: 12,
  },
});
