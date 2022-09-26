import { GET_DOCTOR, RESET_DOCTOR, GET_DOCTOR_APPOINTMENT,LOAD_MORE_DOCTOR_APPOINTMENT, RESET_DOCTOR_APPOINTMENT } from '../Types/actions_type';

const DoctorAction = {
    getDoctor: data => {
        return {
            type: GET_DOCTOR,
            payload: data,
        };
    },

    resetDoctor: () => {
        return {
            type: RESET_DOCTOR,
        };
    },

    getDoctorAppointment: data => {
        return {
            type: GET_DOCTOR_APPOINTMENT,
            payload: data,
        };
    },

    resetDoctorAppointment: () => {
        console.warn("empty")
        return {
            type: RESET_DOCTOR_APPOINTMENT,
        };
    },
    LoadMoreDoctorAppointment: data => {
        console.warn("empty")
        return {
            type: LOAD_MORE_DOCTOR_APPOINTMENT,
            payload: data,
        };
    },
};

export default DoctorAction;
