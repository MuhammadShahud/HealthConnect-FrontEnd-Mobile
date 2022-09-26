import { Alert, Appearance } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

const dummyImage =
  'https://www.pngkit.com/png/full/799-7998601_profile-placeholder-person-icon.png';

const OpenImagePicker = (callback, multiple = false, title = '') => {

  Alert.alert(
    'Options',
    'Select one option to continue',
    [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Camera',
        style: 'default',
        onPress: async () => {
          try {
            var image = await ImagePicker.openCamera({
              multiple: false,
              width: 200,
              height: 200,
            });

            if (image || image.length > 0) {
              callback(image);
            }
          } catch (error) {
            console.warn(error);
            // Alert.alert('Error while uploading image');
          }
        },
      },
      {
        text: 'Library',
        style: 'default',
        onPress: async () => {
          try {
            var image = await ImagePicker.openPicker({
              multiple: multiple,
              width: 200,
              height: 200,
            });
            if (image || image.length > 0) {
              callback(image);
            }
            // else {
            //   Alert.alert({
            //     text: 'Image is not selected',
            //   });
            // }
          } catch (error) {
            console.warn('err ==', error);
            // Alert.alert('Error while uploading image');
          }
        },
      },
    ],
    { cancelable: true },
  );
};



export { dummyImage, OpenImagePicker };
export const IS_IOS = Platform.OS === 'ios';