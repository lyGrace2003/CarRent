import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Observable, catchError, from, of, switchMap, throwError } from 'rxjs';
import { User } from '../model/user';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: Observable<User | null | undefined>;

  constructor(private fireauth: AngularFireAuth, private router: Router,private firestore: AngularFirestore) { 
    this.currentUser = this.fireauth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.firestore.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return new Observable<User | null>(); 
        }
      })
    );
  }

  login(email:string, password: string){
    this.fireauth.signInWithEmailAndPassword(email.trim(),password.trim()).then(() => {
      this.fireauth.currentUser.then(user => {
        localStorage.setItem('token','true');
        //check role value in database and navigate accordingly
      });
    }, err =>{
      alert(err.message);
      
    })
  }

  signup(name: string, email: string, password: string, contactNum: string): Observable<void> {
    return from(this.fireauth.createUserWithEmailAndPassword(email, password)).pipe(
      switchMap((userCredential) => {
        const uid = userCredential.user?.uid;
  
        if (uid) {
          alert("User created successfully");
          const userDoc = this.firestore.collection('users').doc(uid);
          const userData: User = {
            id: uid,
            name: name,
            email: userCredential.user?.email || '',
            password: password,
            contactNum: contactNum,
            role: 'user',
          };
  
          return from(userDoc.set(userData)).pipe(
            switchMap(() => {
              alert("Data saved successfully");
              this.router.navigate(['/login']);
              return of(undefined);
            }),
            catchError((innerError) => {
              alert(innerError.message);
              return throwError(() => new Error(innerError.message));
            })
          );
        } else {
          alert('Error in creating account');
          return throwError(() => new Error('Error in creating account'));
        }
      }),
      catchError((outerError) => {
        alert(outerError.message);
        return throwError(() => new Error(outerError.message));
      })
    );
  }
  

  logout(){
    this.fireauth.signOut().then(() =>{
      localStorage.removeItem('token');
      this.router.navigate(['']);
    }, err=>{
      alert(err.message);
    })
  }
}

