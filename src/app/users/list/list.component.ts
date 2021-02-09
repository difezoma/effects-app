import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styles: [
  ]
})
export class ListComponent implements OnInit {

  users: User[] = [];

  constructor(public userService: UserService) { }

  ngOnInit(): void {

    this.userService.getUsers().subscribe(
      users => this.users = users
    );

  }

}