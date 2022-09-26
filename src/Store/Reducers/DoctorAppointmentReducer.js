import {
    GET_DOCTOR_PAST_APPOINTMENTS,
    RESET_DOCTOR_PAST_APPOINTMENTS,
    GET_DOCTOR_UPCOMING_APPOINTMENTS,
    RESET_DOCTOR_UPCOMING_APPOINTMENTS
} from '../Types/actions_type';

let initialSate = {
    doctorpastappointment: null,
    doctorpastappointment_list: [],
    doctorupcomingappointment: null,
    doctorupcomingappointment_list: [],
    loading: false,
};

const DoctorAppointmentReducer = (state = initialSate, action) => {
    switch (action.type) {
        ////////////////Past//////////////////
        case GET_DOCTOR_PAST_APPOINTMENTS:
            let doctorpastappointment_list_copy = [];
            doctorpastappointment_list_copy = [...state.doctorpastappointment_list, ...action.payload.data];
            state = {
                ...state,
                doctorpastappointment: action.payload,
                doctorpastappointment_list: doctorpastappointment_list_copy,
            };
            break;

        case RESET_DOCTOR_PAST_APPOINTMENTS:
            state = {
                doctorpastappointment: null,
                doctorpastappointment_list: [],
            };
            break;


            ////////////Upcoming/////////////////////

        case GET_DOCTOR_UPCOMING_APPOINTMENTS:
            let doctorupcomingappointment_list_copy = [];
            doctorupcomingappointment_list_copy = [...state.doctorupcomingappointment_list, ...action.payload.data];
            state = {
                ...state,
                doctorupcomingappointment: action.payload,
                doctorupcomingappointment_list: doctorupcomingappointment_list_copy,
            };
            break;

        case RESET_DOCTOR_UPCOMING_APPOINTMENTS:
            state = {
                doctorupcomingappointment: null,
                doctorupcomingappointment_list: [],
            };
            break;

        default:
            break;
    }
    return state;
};

export default DoctorAppointmentReducer;
