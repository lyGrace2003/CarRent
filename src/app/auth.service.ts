import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  users: any[] =[
    {
      id: 1,
      name: 'Allyssa Echevarria',
      email: 'Allyssagrace2003@gmail.com',
      password: 'Allyssa2003',
      contactNum: '094332533126',
      role: 'user',
    },
    {
      id: 2,
      name: 'Grace Echevarria',
      email: 'grazie@gmail.com',
      password: 'GrazieEchevarria',
      contactNum: '094332533126',
      role: 'admin',
    },
  ]
  session: any;
  constructor() { }

  login(email:String, password: string){
    let user = this.users.find((u)=>u.email==email && u.password==password);
    if(user){
      this.session = user;
      localStorage.setItem('session', JSON.stringify(this.session));
    }
    return user;
  }
}
