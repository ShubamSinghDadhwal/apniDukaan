import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor() {
    
    //clear will clear all the values stored inside the session
    sessionStorage.clear();
   }

  ngOnInit(): void {
  }

}
