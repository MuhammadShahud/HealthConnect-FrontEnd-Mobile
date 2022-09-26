import { StyleSheet } from 'react-native';
import { Colors } from '../../Styles';

export const style = StyleSheet.create({
  text: {
    textAlign: 'center',
    fontSize: 16,
    color: Colors.WHITE,
  },
  buttonContainer: {
    // flex: 1,
    paddingVertical: 18,
    marginVertical: 6,
    // backgroundColor: Colors.LIGHT_GREEN,
    alignSelf: 'center',
    borderRadius: 12,
  },
});
