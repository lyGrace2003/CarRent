import { Component, EventEmitter, Output } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  
})
export class NavbarComponent {

  constructor(private fireauth: AngularFireAuth ,private router: Router) {}

  logout() {
    this.fireauth.signOut().then(() =>{
      localStorage.removeItem('token');
      this.router.navigate(['/']);
    }).catch((error)=>{
      console.error("Error creating user: ", error);
    })
  }

  @Output() sidebarToggle = new EventEmitter<boolean>();
  menuStatus: boolean = false;

  SidebarToggle(){
    this.menuStatus = !this.menuStatus;
    this.sidebarToggle.emit(this.menuStatus);
  }

}
