import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  email: string ='';
  password: string='';

  constructor(private route:Router, private loginService: LoginService){}

  login(){
    if(this.loginService.login(this.email,this.password)){
      this.route.navigate(['/rooms'])
    }
  }

}
