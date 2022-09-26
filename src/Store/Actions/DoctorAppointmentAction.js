import { GET_DOCTOR_PAST_APPOINTMENTS, RESET_DOCTOR_PAST_APPOINTMENTS, GET_DOCTOR_UPCOMING_APPOINTMENTS, RESET_DOCTOR_UPCOMING_APPOINTMENTS } from '../Types/actions_type';

const DoctorAppointmentAction = {
  ///////////Past//////////
  getDoctorPastAppointment: data => {
    return {
      type: GET_DOCTOR_PAST_APPOINTMENTS,
      payload: data,
    };
  },

  resetDoctorPastAppointment: () => {
    return {
      type: RESET_DOCTOR_PAST_APPOINTMENTS,
    };
  },

///////Upcoming///////////////
  getDoctorUpcomingAppointment: data => {
    return {
      type: GET_DOCTOR_UPCOMING_APPOINTMENTS,
      payload: data,
    };
  },

  resetDoctorUpcomingAppointment: () => {
    return {
      type: RESET_DOCTOR_UPCOMING_APPOINTMENTS,
    };
  },
};

export default DoctorAppointmentAction;
