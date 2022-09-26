import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, Image, ToastAndroid, PermissionsAndroid} from 'react-native';
import {style} from './style';
import {Header, SubmitButton, TextInput} from '../../Components';
import {Colors} from '../../Styles';
import {CameraIcon, UploadIcon} from '../../Assets';
import DocumentPicker, { types } from "react-native-document-picker";
import LabReportsMiddleware from '../../Store/Middleware/LabReportsMiddleware';
import {useDispatch} from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';

const AddLabReport = () => {

  useEffect(()=>{
    // requestStoragePermission()
  },[])

  const [reportTitle, setReportTitle] = useState('')
  const [reportID, setReporID] = useState('')
  const [selectedDocument, setSelectedDocument] = useState(null)
  const [selectDocumentText, setSelectDocumentText] = useState('Upload')
  const [scanDocumentText, setScanDocumentText] = useState('Scan Document')
  const dispatch = useDispatch();


  const requestStoragePermission = async (value) => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: "Storage Permission",
          message:
            "HealthConet needs access to your storage ",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log(value);
        if(value == 'scan'){
          onPressScanDocument()
        }
        else{
          onPressUplaodDocument()
        }
      } else {
        alert.alert("Note","Storage permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  }
  
  const onPressUplaodDocument = async () => {
    try {
      const response = await DocumentPicker.pick({
        presentationStyle: 'fullScreen',
        type: [types.pdf, types.docx, types.plainText, types.doc]
      });
      let doc = response[0]
      setSelectedDocument({
        uri: doc.uri,
        name: doc.name,
        size: doc.size,
        type: doc.type,
      })
      setSelectDocumentText(doc.name)
      setScanDocumentText('Scan Document')
      ToastAndroid.showWithGravityAndOffset(
        "File selected successfully..",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50
      );
    } catch (err) {
      console.warn(err);
    }
  };

  const onPressScanDocument = async () => {
    try {
      const response = await ImagePicker.openCamera({
        width: 300,
        height: 400,
        cropping: true,
      }).then(image => {
        let docSplitLength = image.path.split("/").length
        let imageName = image.path.split("/")[docSplitLength-1]
        setSelectedDocument({
          uri: image.path,
          name: imageName,
          size: image.size,
          type: image.mime,
        })
        // console.log('----',imageName);
        setScanDocumentText(imageName)
        setSelectDocumentText('Upload')
        ToastAndroid.showWithGravityAndOffset(
        "Document scanned successfully..",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50
      );
      });
    } catch (error) {
      console.log(error);      
    }

  }

  const onpressSubmit = () => {
    if(reportTitle == ''){
      ToastAndroid.showWithGravityAndOffset(
        "Enter report title..",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50
      );
    }
    else if(reportID == ''){
      ToastAndroid.showWithGravityAndOffset(
        "Enter report ID..",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50
      );
    }
    else if(selectedDocument == null){
      ToastAndroid.showWithGravityAndOffset(
        "Please scan or select document..",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50
      );
    }
    else{
      let userData = {
        reportTitle: reportTitle,
        reportID: reportID,
        selectedDocument: selectedDocument,
      };
      dispatch(LabReportsMiddleware.uploadDocument(userData))
        .then(data => {
         console.log(data);
        })
        .catch(err => {console.log(err)});
    }
  }

  return (
    <View style={style.container}>
      <View style={{paddingHorizontal: 22}}>
        <Header headerLeft={true} title={'Laboratory'} />
      </View>

      <View style={{marginTop: 20, width: '90%', alignSelf: 'center'}}>
        <Text style={style.title}>Add Lab Report</Text>

        <TextInput
          value={reportTitle}
          placeholder={'Report Title'}
          placeholderTextColor={'grey'}
          onChangeText={text => setReportTitle(text)}
          style={{paddingHorizontal: 12, color: '#000'}}
          inputContainerStyle={style.inputContainerStyle}
        />
        <TextInput
          value={reportID}
          placeholder={'Report ID'}
          placeholderTextColor={'grey'}
          onChangeText={text => setReporID(text)}
          style={{paddingHorizontal: 12, color: '#000'}}
          inputContainerStyle={style.inputContainerStyle}
        />

        <View style={style.uploadButtonContainer}>
          <TouchableOpacity
          onPress={()=>requestStoragePermission('scan')}
            style={{
              width: '48%',
              height: 170,
              borderWidth: 1,
              borderRadius: 12,
              borderColor: Colors.LIGHT_GREEN,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              source={CameraIcon}
              style={{width: 35, height: 35}}
              resizeMode="contain"
            />

            <Text style={{paddingVertical: 7, color: 'grey'}}>{scanDocumentText}</Text>
          </TouchableOpacity>

          <TouchableOpacity
          onPress={()=>requestStoragePermission('upload')}
            style={{
              width: '48%',
              height: 170,
              borderWidth: 1,
              borderRadius: 12,
              borderColor: Colors.LIGHT_GREEN,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              source={UploadIcon}
              style={{width: 35, height: 35}}
              resizeMode="contain"
            />

            <Text style={{paddingVertical: 7, color: 'grey'}}>{selectDocumentText}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <SubmitButton
        // onPress={() => navigation.navigate('AddReport')}
        onPress={onpressSubmit}
        text={'Submit'}
        buttonContainer={[style.submitButton, {paddingVertical: 16}]}
      />
    </View>
  );
};

export default AddLabReport;
