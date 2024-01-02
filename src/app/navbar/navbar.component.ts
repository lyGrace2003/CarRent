import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  
})
export class NavbarComponent {

  constructor(private router: Router) {}

  logout() {
    this.router.navigate(['/']);
  }

  @Output() sidebarToggle = new EventEmitter<boolean>();
  menuStatus: boolean = false;

  SidebarToggle(){
    this.menuStatus = !this.menuStatus;
    this.sidebarToggle.emit(this.menuStatus);
  }

}
