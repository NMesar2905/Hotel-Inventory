import { inject } from '@angular/core';
import { CanMatchFn } from '@angular/router';
import { LoginService } from '../components/login/login.service';

export const canLoadLoginGuard: CanMatchFn = (route, segments) => {
  const loginService = inject(LoginService);  
  return loginService.isLoggedIn;
};
