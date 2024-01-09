import { Component } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Router } from "@angular/router";

@Component({
    selector: 'app-admin-nav',
    templateUrl: './adminnav.component.html',
    styleUrls: ['./adminnav.component.css']
})

export class AdminNavComponent{

    constructor(private fireauth: AngularFireAuth ,private router: Router) {}
    logout() {
        this.fireauth.signOut().then(() =>{
          localStorage.removeItem('token');
          this.router.navigate(['/']);
        }).catch((error)=>{
          console.error("Error creating user: ", error);
        })
      }
}