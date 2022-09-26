import {StyleSheet} from 'react-native';
import {Colors} from '../../Styles';

export const style = StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.WHITE},
  categoryContainer: {
    width: '90%',
    alignSelf: 'center',
    marginVertical: 12,
  },
  categoryText: {fontSize: 18, fontWeight: 'bold', color: Colors.BLACK},
});
