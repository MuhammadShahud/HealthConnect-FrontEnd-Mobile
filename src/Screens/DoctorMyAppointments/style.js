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
  name: {fontSize: 16, fontWeight: 'bold', color: Colors.BLACK},
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
    paddingHorizontal: 6,
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
  },
  appointmentBtn: {
    width: '90%',
    paddingVertical: 18,
    marginVertical: 6,
    alignSelf: 'center',
    borderRadius: 12,
  },
  ratingContainer: {flexDirection: 'row', marginVertical: 8},
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
  bottomContainer: {width: '90%', alignSelf: 'center', marginVertical: 12},
  title: {fontSize: 16, fontWeight: 'bold', color: Colors.BLACK},
});
