import { ChangePasswordUseCase } from './change-password.case';
import { LoginUseCase } from './login.case';
import { RegistrationUseCase } from './registration.case';

export const UserModuleUseCases = [
  RegistrationUseCase,
  ChangePasswordUseCase,
  LoginUseCase,
];
