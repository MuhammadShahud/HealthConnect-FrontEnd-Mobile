import {StyleSheet} from 'react-native';
import {Colors} from '../../Styles';

export const style = StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.WHITE},
  buttonContainer: {
    width: '70%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  button: {
    width: '48%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 22,
  },
  historyContainer: {
    borderWidth: 1,
    width: '45%',
    marginLeft: 12,
    marginTop: 12,
    alignSelf: 'center',
    alignItems: 'flex-end',
    borderColor: Colors.LIGHT_GRAY,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.BLACK,
    paddingVertical: 8,
  },
  inputContainerStyle: {
    alignSelf: 'center',
    marginVertical: 10,
    width: '100%',
  },
  uploadButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 12,
  },
  submitButton: {
    paddingVertical: 7,
    width: '95%',
    borderRadius: 5,
    backgroundColor: Colors.LIGHT_GREEN,
  },
});
