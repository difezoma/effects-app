import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { loadUsers } from 'src/app/store/actions';
import { AppState } from 'src/app/store/app.reducers';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styles: [
  ]
})
export class ListComponent implements OnInit {

  users: User[] = [];
  loading: boolean = false;
  error: any;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {

    this.store.select('users').subscribe((state) => 
    {
      this.users = state.users;
      this.loading = state.loading;
      this.error = state.error;
    });

    this.store.dispatch(loadUsers());

    /* this.userService.getUsers().subscribe(
      users => this.users = users
    ); */

  }

}
