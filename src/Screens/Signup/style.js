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
  logo: { width: '70%', height: 150, resizeMode: 'contain' },
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
    paddingVertical: 5,
    marginVertical: 5,
    alignItems: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    width: '15%',
    justifyContent: 'space-between',
    marginVertical: 6,
  },
  signupContainer: {
    flexDirection: 'row',
    paddingVertical: 12,
    alignItems: 'center',
  },
  pickerContainer: {
    width: '90%',
    borderWidth: 1,
    borderRadius: 12,
    borderColor: Colors.LIGHT_GREEN,
    marginVertical: 6,
  },
  btnText: { fontWeight: 'bold', color: Colors.LIGHT_GREEN },
  socialButton: { padding: 4 },
  dropDownBtnText: {
    color: Colors.GRAY,
    textAlign: 'left',
  },
});
