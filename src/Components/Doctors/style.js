import {StyleSheet} from 'react-native';
import {Colors} from '../../Styles';

export const style = StyleSheet.create({
  doctorButton: {
    width: '90%',
    elevation: 1,
    paddingVertical: 8,
    marginVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 22,
    flexDirection: 'row',
    alignSelf: 'center',
    backgroundColor: Colors.WHITE,
  },
  name: {
    paddingHorizontal: 14,
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.BLACK,
  },
  speciality: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: 'grey'
  },
});
