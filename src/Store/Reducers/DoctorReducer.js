import {
    GET_DOCTOR,
    // LOGOUT,
    RESET_DOCTOR,
    GET_DOCTOR_APPOINTMENT,
    RESET_DOCTOR_APPOINTMENT,
    LOAD_MORE_DOCTOR_APPOINTMENT,
} from '../Types/actions_type';

let initialSate = {
    Doctor: null,
    Doctor_list: [],
    DoctorAppointment: null,
    DoctorAppointment_list: [],
    loading: false,
};

const DoctorReducer = (state = initialSate, action) => {
    console.log('action type', action.type);
    switch (action.type) {
        case GET_DOCTOR:
            let Doctor_list_copy = [];
            Doctor_list_copy = [...state.Doctor_list, ...action.payload.data];
            state = {
                ...state,
                Doctor: action.payload,
                Doctor_list: Doctor_list_copy,
            };
            break;


        case RESET_DOCTOR:
            state = {
                Doctor: null,
                Doctor_list: [],
            };
            break;


        case GET_DOCTOR_APPOINTMENT:
            // let DoctorUpcomingAppointment_list_copy = [];
            // DoctorUpcomingAppointment_list_copy = [...state.DoctorUpcomingAppointment_list,...action.payload.data];
            state = {
                ...state,
                DoctorAppointment: action.payload,
                DoctorAppointment_list: action.payload.data,
            };
            break;

        case RESET_DOCTOR_APPOINTMENT:
            state = {
                DoctorAppointment: null,
                DoctorAppointment_list: [],
            };
            break;

            case LOAD_MORE_DOCTOR_APPOINTMENT:
                let DoctorAppointment_list_copy1 = [];
            DoctorAppointment_list_copy1 = [...state.DoctorAppointment_list,...action.payload.data];
            state = {
                ...state,
                DoctorAppointment: action.payload,
                DoctorAppointment_list: DoctorAppointment_list_copy1,
            };
            break;
               
        default:
            break;
    }
    return state;
};

export default DoctorReducer;
