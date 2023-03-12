import { ChangePasswordUseCase } from '../use-cases/change-password.case';
import { LoginUseCase } from '../use-cases/login.case';
import { RegistrationUseCase } from './../use-cases/registration.case';

export interface AuthUseCases {
  register: RegistrationUseCase;
  changePassword: ChangePasswordUseCase;
  login: LoginUseCase;
}
