import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/shared/auth.service";

@Component({
    selector: 'app-start',
    templateUrl: './start.component.html',
    styleUrls: ['./start.component.css']
  })

export class StartComponent{
  form: FormGroup =  this.fb.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
    contactNum: ['', Validators.required],
  });
  constructor (private authService: AuthService, private fb: FormBuilder, private router: Router){}

  signup(){
    if(this.form.value.name.trim()=='' || this.form.value.email.trim()=='' || this.form.value.password.trim()=='' || this.form.value.contactNum.trim()==''){
      alert("Incomplete Form");
    }else if(this.form.value.password.trim().length<=4){
      alert("Password is too short");
    }else if(!this.form.value.email.trim().includes("@")){
      alert("Email is invalid");
    }else{
      this.authService.signup(this.form.value.name.trim(),this.form.value.email.trim(),this.form.value.password.trim(),this.form.value.contactNum.trim());
    }
  }
}
