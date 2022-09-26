
import { post, get, baseURL, POST, imgURL } from '../../configs/AxiosConfig';
import { ActionTypes } from '../Types/actions_type';
import { getHeaders } from '../../Utils';
import Storage from '../../Utils/AsyncStorage';
import axios from 'axios';
// import AuthAction from '../Actions/AuthAction';
import RNFetchBlob from 'rn-fetch-blob';
import { Alert } from 'react-native';
import { IS_IOS } from '../../config';
import Apis, { BASE_URL, IMG_URL } from '../Apis';


export const ChatMiddleware = {
  getChatIndex: ({ next_page_url, name }) => {
    return async dispatch => {
      return new Promise(async (resolve, reject) => {
        try {
          if (next_page_url == undefined || name) {
            dispatch({ type: ActionTypes.Reset_Get_ChatsIndex, payload: request });
          }
          // dispatch({ type: ActionTypes.ShowLoading });
          let formData = new FormData();
          formData.append('search', name);
          // console.warn('search', formData)
          let request = await axios.post(
            Apis.getchatIndex(next_page_url),
            name ? formData : {},
            await getHeaders(),
          );
          // console.warn('request ===', request);
          if (request) {
            dispatch({ type: ActionTypes.Get_ChatsIndex, payload: request });
            resolve(request)
          } else {
            dispatch({ type: ActionTypes.HideLoading });
            reject(false)
          }
        } catch (error) { }
      });
    };
  },

  SendMessage: ({ userId, message, type, uri }) => {
    console.warn("GG ===>", userId, message, type, uri);
    return dispatch => {
      return new Promise(async (resolve, reject) => {
        try {
          let formData = new FormData();
          formData.append('user_id', userId);
          formData.append('message', message);
          formData.append('type', type);
          let response = await axios.post(
            Apis.SendMessage,
            formData,
            await getHeaders(),
          );
          console.warn("Response===>", response);
          if (response) {
            resolve(response?.data?.data);
          } else {
            reject(false);
          }
        } catch (error) {
          reject(false);
        }
      });
    };
  },


  ShareReport: ({ userId, message, report_id = null, type, uri }) => {
    console.warn("GG ===>", userId, message, type, uri);
    return dispatch => {
      return new Promise(async (resolve, reject) => {
        try {
          let formData = new FormData();
          formData.append('user_id', userId);
          formData.append('message', message);
          formData.append('type', type);
          if (report_id)
            formData.append('report_id', report_id);

          console.warn(formData)
          let response = await axios.post(
            Apis.SendMessage,
            formData,
            await getHeaders(),
          );
          console.warn("Response===>", response);
          if (response) {
            resolve(response?.data?.data);
          } else {
            reject(false);
          }
        } catch (error) {
          console.warn(error)
          reject(false);
        }
      });
    };
  },





  SendAttachment: ({ userData, userId, callback, uploading }) => {
    console.warn('userData', userData, 'userId', userId);
    //console.warn('baseurl', BASE_URL, 'Api', Apis.Send_Attachment);
    return async dispatch => {
      let headers = (await getHeaders()).headers
      await RNFetchBlob
        .config({ timeout: 60000000000 })
        .fetch("POST", Apis.Send_Attachment,
          headers,
          [{
            name: "type",
            data: "media",
          },
          {
            name: "user_id",
            data: userId + ""
          },
          {
            name: "message",
            data: "Attachment"
          },
          {
            name: "image",
            data: userData?.type + "",
          },

          // {
          //   name: "media",
          //   filename: userData?.media?.name,
          //   data: RNFetchBlob.wrap(userData?.media?.uri),
          //   type: userData?.media?.type,
          // },
          {
            name: "media",
            filename: userData?.media?.name,
            data: IS_IOS ? RNFetchBlob.wrap(userData?.media?.uri.replace('file://', '')) :
              RNFetchBlob.wrap(userData?.media?.uri),
            type: userData?.media?.type,
          },
          ...userData?.thumbnail ? [{
            name: "thumbnail",
            filename: userData?.thumbnail?.name,
            data: RNFetchBlob.wrap(userData?.thumbnail?.uri)
          },] : []]
        )
        .uploadProgress((sent, total) => {
          uploading(sent, total);
        })
        .then((request) => {
          console.warn('request', JSON.parse(JSON.stringify(request.data)));
          dispatch({ type: ActionTypes.SEND_ATTACHMENT, payload: JSON.parse(request?.data) });
          callback(request)
          //console.warn()
        }).catch((err) => {
          console.warn('requestError', err);
        })
    };
  },

  DownloadAttachment: ({ selectedItem, }) => {

    let dirs = RNFetchBlob.fs.dirs
    console.warn('dirs.DocumentDir', dirs.DownloadDir);
    // console.warn('baseURL + selectedItem', imgURL + selectedItem,);
    return async dispatch => {
      let headers = (await getHeaders()).headers

      await RNFetchBlob
        .config({
          timeout: 60 * 60,
          fileCache: true,
          path: dirs.DownloadDir + '/' + selectedItem,
          addAndroidDownloads: {
            useDownloadManager: true,
            notification: true,
            mime: 'application/pdf',
            title: selectedItem,
            path: IS_IOS ? dirs.DocumentDir + '/' + selectedItem : dirs.DownloadDir + '/' + selectedItem,

          },

        })
        .fetch("GET", IMG_URL + selectedItem,
          headers,
        )

        .then((res) => {
          IS_IOS ? RNFetchBlob.ios.openDocument(res.data)
            :
            Alert.alert('File Downloaded Successfully.');
          console.warn('The file saved to ', res.path())

          console.warn(res)
        }).catch((err) => {
          console.warn(err);
        })
    };
  },

  getAllUserMessages: ({ next_url, id }) => {
    console.warn('responseMsg ====', next_url, id);
    return dispatch => {
      return new Promise(async (resolve, reject) => {
        try {

          let response = await axios.get(
            Apis.getAllMessages(next_url, id),
            await getHeaders()
          );
          console.warn('response ====>1', response.data);
          if (response?.data?.success) {
            resolve(response.data);
          } else {
            reject(false);
          }
        } catch (error) {
          console.warn('error ====>', error);
          reject(false);
        }
      });
    };
  },

  ChatSession: ({ id }) => {
    console.warn("Jee Chat session", id);
    return async dispatch => {
      return new Promise(async (resolve, reject) => {
        try {

          let formData = new FormData();
          formData.append('id', id);
          let request = await axios.post(
            Apis.ChatSession,
            formData,
            await getHeaders(),
          );
          console.warn("Response", request.data.data);

          if (request) {

            dispatch({ type: ActionTypes.ChatSession, payload: request?.data?.data });
            resolve(request?.data?.data)
          } else {
            dispatch({ type: ActionTypes.HideLoading });
          }
        } catch (error) {
          console.warn("ERROR", error);
        }
      });
    };
  },
};
