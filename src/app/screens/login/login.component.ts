import { Component } from '@angular/core';
import { ReactiveFormsModule,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form: FormGroup =  this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });
  constructor (private authService: AuthService, private fb: FormBuilder, private router: Router){}

  login(){
    let user = this.authService.login(this.form.value.email, this.form.value.password);

    if(!user){
      alert('Invalid email or password');
    }else{
      if (user.role === 'user') {
        this.router.navigateByUrl('/user');
      } else if (user.role === 'admin') {
        this.router.navigateByUrl('/admin');
      }
    }
  }
}
