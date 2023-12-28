import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  
})
export class NavbarComponent {
  @Output() sidebarToggle = new EventEmitter<boolean>();
  menuStatus: boolean = false;

  SidebarToggle(){
    this.menuStatus = !this.menuStatus;
    this.sidebarToggle.emit(this.menuStatus);
  }

}
