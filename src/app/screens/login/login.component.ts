import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';

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


  constructor (private fireauth: AngularFireAuth,private fb: FormBuilder, private router: Router,private firestore: AngularFirestore){}


  checkRole(id: string){
    const userDocRef = this.firestore.collection('users').doc(id);
    userDocRef.get().subscribe((doc) => {
      if (doc.exists) {
        const role = doc.get('role');
        if (role === 'admin') {
          this.router.navigate(['/admin']);
        } else if (role === 'user') {
          this.router.navigate(['/user']);
        } else {
          console.error('Invalid role:', role);
          alert("Error loging in user: ");
          this.router.navigate(['/']);
        }
      } else {
        alert('User not found');
        this.router.navigate(['/']);
      }
    });
  }

  login(){
    if(this.form.value.email.trim()=='' || this.form.value.password.trim()==''){
      alert("Incomplete Form");
    }else if(this.form.value.password.trim().length<=4){
      alert("Password is too short");
    }else if(!this.form.value.email.trim().includes("@")){
      alert("Email is invalid");
    }else{
      this.fireauth.signInWithEmailAndPassword(this.form.value.email.trim(),this.form.value.password.trim()).then((userCredential) => {
        const uid = userCredential.user?.uid;
        localStorage.setItem('token','true');
        if(uid){
          this.checkRole(uid);
        }
    })
    .catch((error) => {
      alert("Error loging in user: ");
      this.router.navigate(['/']);
    });
    }
  }
}
