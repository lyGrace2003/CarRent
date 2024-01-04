import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Firestore } from '@angular/fire/firestore';
import { collection, doc, setDoc } from 'firebase/firestore';
import { inject } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})

export class StartComponent {
  form: FormGroup = this.fb.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
    contactNum: ['', Validators.required],
  });
  firestore: Firestore = inject(Firestore);

  constructor(private fireauth: AngularFireAuth, private fb: FormBuilder, private router: Router) {}

  async saveData(id: string){
    const acollection = collection(this.firestore, 'users');
    const userDocRef = doc(acollection, id);

    await setDoc(userDocRef, {
        'id': id,
        'name': this.form.value.name.trim(),
        'email': this.form.value.email.trim(),
        'password': this.form.value.password.trim(),
        'contactNum': this.form.value.contactNum.trim(),
        'role': 'user',
    });
  }

  signup() {
    if (this.form.value.name.trim() == '' || this.form.value.email.trim() == '' || this.form.value.password.trim() == '' || this.form.value.contactNum.trim() == '') {
      alert("Incomplete Form");
    } else if (this.form.value.password.trim().length <= 4) {
      alert("Password is too short");
    } else if (!this.form.value.email.trim().includes("@")) {
      alert("Email is invalid");
    } else {
      this.fireauth.createUserWithEmailAndPassword(this.form.value.email.trim(), this.form.value.password.trim())
      .then((userCredential) => {
        const uid = userCredential.user?.uid;
        if (uid) {
          this.saveData(uid);
          this.router.navigate(['/login']);
        }
      })
      .catch((error) => {
        console.error("Error creating user: ", error);
      });
    }
  }  
}
