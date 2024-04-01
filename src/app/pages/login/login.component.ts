import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private router: Router) {}

  username: string = '';
  password: string = '';

  loginFormSubmit() {
    // Handle login logic here
    console.log('Username:', this.username);
    console.log('Password:', this.password);
    if(this.username === 'admin' && this.password === 'admin'){
      console.log('LOGIN SUCCESSFUL')
      this.router.navigate(['classes']);
    }
  }


}
