import { StyleSheet } from 'react-native';
import { Colors } from '../../Styles';

export const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  imageContainer: {
    flex: 0.35,
    borderBottomRightRadius: 100,
    borderBottomLeftRadius: 100,
    backgroundColor: Colors.DARK_BLUE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: { width: '100%', height: 150, resizeMode: 'contain' },
  secureTextContainer: {
    marginVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerTitle: {
    fontSize: 20,
    paddingVertical: 12,
    fontWeight: 'bold',
    color: Colors.BLACK,
  },
  bottomContainer: {},
  text: {
    fontWeight: 'bold',
    color: Colors.BLACK,
  },
  radioButtonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    paddingVertical: 10,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioButtonText: {
    paddingHorizontal: 2,
    color: '#000'
  },
  inputContainer: {
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
  forgotContainer: {
    width: '90%',
    alignSelf: 'center',
    alignItems: 'flex-end',
    paddingVertical: 2,
  },
  socialBtnContainer: {
    width: '100%',
    paddingVertical: 12,
    marginVertical: 15,
    alignItems: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    width: '15%',
    justifyContent: 'space-between',
  },
  signupContainer: {
    flexDirection: 'row',
    paddingVertical: 12,
    alignItems: 'center',
  },
  btnText: { fontWeight: 'bold', color: Colors.LIGHT_GREEN },
  socialButton: { padding: 5, marginHorizontal: 2, marginVertical: 3, },
});
