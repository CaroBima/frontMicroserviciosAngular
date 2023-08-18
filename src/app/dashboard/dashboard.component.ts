import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor(public userService: UsersService) {}
  ngOnInit() {
    this.getUserLogged();
  }
  getUserLogged() {
    this.userService.getUser().subscribe((user) => {
      console.log(user);
    });
  }
}
