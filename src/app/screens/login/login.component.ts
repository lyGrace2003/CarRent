import { Component } from '@angular/core';
import { ReactiveFormsModule,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';

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
    if(this.form.value.email.trim()=='' || this.form.value.password.trim()==''){
      alert("Incomplete Form");
    }else if(this.form.value.password.trim().length<=4){
      alert("Password is too short");
    }else if(!this.form.value.email.trim().includes("@")){
      alert("Email is invalid");
    }else{
      this.authService.login(this.form.value.email.trim(), this.form.value.password.trim());
    }
  }
}
