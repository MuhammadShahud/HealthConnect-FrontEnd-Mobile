import { combineReducers } from 'redux';

import AuthReducer from './AuthReducer';
import GeneralReducer from './GeneralReducer';
import ServiceReducer from './ServiceReducer';
import PharmaciesReducer from './PharmaciesReducer';
import TransportReducer from './TransportReducer';
import ClinicReducer from './ClinicReducer';
import LaboratoryReducer from './LaboratoryReducer';
import NurseReducer from './NurseReducer';
import TeleHealthReducer from './TeleHealthReducer';
import LabReportsReducer from './LabReportsReducer';
import ChatIndexReducer from './ChatIndexReducer';
import PaymentCardReducer from './PaymentCardReducer';
import SubServicesReducer from './SubServicesReducer';
import DoctorReducer from './DoctorReducer';
import FamilyMemberReducer from './FamilyMemberReducer';
import ChatReducer from './ChatReducer';
import DoctorAppointmentReducer from './DoctorAppointmentReducer';
import MedicalAssistantReducer from './MedicalAssistantReducer';

export default combineReducers({
  AuthReducer,
  GeneralReducer,
  ServiceReducer,
  PharmaciesReducer,
  TransportReducer,
  ClinicReducer,
  LaboratoryReducer,
  NurseReducer,
  TeleHealthReducer,
  LabReportsReducer,
  ChatIndexReducer,
  PaymentCardReducer,
  SubServicesReducer,
  DoctorReducer,
  FamilyMemberReducer,
  ChatReducer,
  DoctorAppointmentReducer,
  MedicalAssistantReducer
});
