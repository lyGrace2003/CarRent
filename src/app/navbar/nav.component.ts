import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
  
})
export class NavComponent {
  @Output() sidebarToggle = new EventEmitter<boolean>();
  menuStatus: boolean = false;

  SidebarToggle(){
    this.menuStatus = !this.menuStatus;
    this.sidebarToggle.emit(this.menuStatus);
  }

}
