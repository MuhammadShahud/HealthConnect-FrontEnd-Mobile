//local pc
// export const BASE_URL = `http://192.168.0.172/health/api/`;
// export const IMG_URL = `http://192.168.0.172/health/public/images/`;

//Stage
//const BASE_URL = `http://202.142.180.146:90/health/api/`;
//export const IMG_URL = `http://202.142.180.146:90/health/public/images/`;

//Live
// const BASE_URL = `http://blackowned.biz/health/api/`;
const BASE_URL = `https://healthconet.com/api/`;
// export const IMG_URL = `http://blackowned.biz/health/public/images/`;
export const IMG_URL = `https://healthconet.com/public/images/`;

const Apis = {
    REGISTER: `${BASE_URL}register`,
    LOGIN: `${BASE_URL}login`,
    SOCIAL_LOGIN: `${BASE_URL}socialLogin`,
    SEND_MAIL: `${BASE_URL}sendMail`,
    RESET_PASSWORD: `${BASE_URL}resetPassword`,
    FORGOT_PASSWORD: `${BASE_URL}sendMail`,
    GET_ALL_SERVICES: `${BASE_URL}customers/getAllServices`,
    USERINFO: `${BASE_URL}getUserData`,
    UPLOAD_REPORT: `${BASE_URL}uplaodReport`,
    UPDATE_PROFILE: `${BASE_URL}updateProfile`,
    UPDATE_DOCTOR_PROFILE: `${BASE_URL}updateDoctorProfile`,
    GET_INFO_PAGE: `${BASE_URL}data`,
    GET_DOCTOR_RATING: `${BASE_URL}getDoctorRating`,
    //TEST: `${BASE_URL}getTest`,
    GET_SERVICES: (next_page_url) =>
        next_page_url ? next_page_url : `${BASE_URL}getServices`,
    GET_PHARMACIES: (next_page_url) =>
        next_page_url ? next_page_url : `${BASE_URL}getPharmacies`,
    GET_TRANSPORT: (next_page_url) =>
        next_page_url ? next_page_url : `${BASE_URL}getTransport`,
    GET_USER_REPORTS: (next_page_url) =>
        next_page_url ? next_page_url : `${BASE_URL}getUserReports`,
    GET_CLINICS: (next_page_url) =>
        next_page_url ? next_page_url : `${BASE_URL}getClinics`,
    GET_LABORSTORIES: (next_page_url) =>
        next_page_url ? next_page_url : `${BASE_URL}getLaboratories`,
    GET_VISITING_NURSE: (next_page_url) =>
        next_page_url ? next_page_url : `${BASE_URL}getVisitingNurse`,
    GET_DOCTOR: (next_page_url) =>
        next_page_url ? next_page_url : `${BASE_URL}getDoctor`,
    GET_ALL_USER_RATING: `${BASE_URL}getAllUserRatings/`,
    BOOK_APPOINTMENT: `${BASE_URL}bookAppointment/`,
    GET_CHAT_INDEX: (next_page_url) =>
        next_page_url ? next_page_url : `${BASE_URL}chatIndex`,
    STORE_CARD: `${BASE_URL}storeCard`,
    SHOW_METHOD: `${BASE_URL}showMethod`,
    UPDATE_DEFAULT_CARD: `${BASE_URL}updateDefaultCard/`,
    DELETE_CARD: `${BASE_URL}deleteCard`,
    GET_SUB_SERVICES: (next_page_url) =>
        next_page_url ? next_page_url : `${BASE_URL}getSubServices`,
    PROVIDER_SERVICES: (next_page_url) =>
        next_page_url ? next_page_url : `${BASE_URL}providerServices/`,
    SUBMIT_REVIEW: `${BASE_URL}submitReview`,
    NOTIFY_STATUS: `${BASE_URL}notifyStatus`,
    CHANGE_PASSWORD: `${BASE_URL}changePassword/`,
    INVITE_MEMBER: `${BASE_URL}inviteMember`,
    LIST_MEMBERS: `${BASE_URL}listMembers`,
    REMOVE_MEMBER: `${BASE_URL}removeMember/`,
    GET_USERS: `${BASE_URL}getUsers`,
    UPCOMING_APPOINTMENTS: `${BASE_URL}getUserAppointments`,
    PAST_APPOINTMENTS: `${BASE_URL}pastAppoint`,
    CANCEL_APPOINTMENT: `${BASE_URL}cancelAppoinement/`,
    POPULAR_DOCTOR: `${BASE_URL}getPopularDoctor`,
    PROVIDER_SERVICES_BY_ID: `${BASE_URL}providerServicesByid`,
    GET_DOCTOR_APPOINTMENT: (next_page_url) =>
        next_page_url ? next_page_url : `${BASE_URL}getDoctorAppointments`,
    GET_LATEST_APPOINTMENT_REQUEST: `${BASE_URL}getLatestAppoinmentRequest`,
    GET_DOCTOR_PAST_APPOINTMENT_REQUEST: (next_page_url) =>
        next_page_url ? next_page_url : `${BASE_URL}getDoctorPastAppointmentRequests`,
    GET_DOCTOR_UPCOMING_APPOINTMENT_REQUEST: (next_page_url) =>
        next_page_url ? next_page_url : `${BASE_URL}getDoctorUpcomingAppointmentRequests`,
    ACCEPT_APPOINTMENT_REQUEST: `${BASE_URL}acceptAppoinmentRequest`,
    CANCEL_APPOINTMENT_REQUEST: `${BASE_URL}cancelAppoinmentRequest`,
    GET_MEDICAL_ASSISTANT: (next_page_url) =>
        next_page_url ? next_page_url : `${BASE_URL}getMedicalassistants`,
    REQUEST_TO_ASSISTANT: `${BASE_URL}requestToAssistant`,
    COMPLETE_APPOINTMENT: `${BASE_URL}completeAppoinment`,
    USER_NOTIFICATIONS: `${BASE_URL}userNotifications`,
    getchatIndex: next_page_url =>
        next_page_url ? next_page_url : `${BASE_URL}chatIndex`,
    SendMessage: `${BASE_URL}sendMessage`,
    Send_Attachment: `${BASE_URL}sendMessage`,
    ChatSession: `${BASE_URL}chatSession`,
    getAllMessages: (next_url, id) =>
        next_url ? `${BASE_URL}viewChatlist/${id}?page=${next_url}` : `${BASE_URL}viewChatlist/${id}`,
    GET_ALL_PACKAGES: `${BASE_URL}getAllPackages`,
    GET_SUB_HISTORY: `${BASE_URL}getSubHistory`,
    SUBSCRIBE: `${BASE_URL}subscribe`,
    LOGOUT: `${BASE_URL}logout`,
    GENERATE_TOKEN: `${BASE_URL}generateToken`,
    DECELINE_CALL: `${BASE_URL}declineCall`,
    CHARGE_AMOUNT: `${BASE_URL}chargeAmount`,



};

export const post = async (url, data, config) => {
    try {
        let request = await instance.post(url, data, config);
        //  console.warn("YEYEYEYEYE:", request);
        if (request.success == true) {
            return request.data;
        } else {
            //   console.warn(request.data)
            alert(request.data.message);
        }
    } catch (error) {
        // console.log('------------------->', JSON.stringify(error.response))
        alert(error);
    }
};
export default Apis;
