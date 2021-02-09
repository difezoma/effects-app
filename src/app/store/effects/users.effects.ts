import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, mergeMap, tap } from "rxjs/operators";
import { UserService } from "src/app/services/user.service";
import { loadUsers, loadUsersError, loadUsersSuccess } from "../actions";


@Injectable()
export class UsersEffects{

    constructor(
        private actions$: Actions,
        private userService: UserService
    ){}

    loadUsers$ = createEffect(
        () => this.actions$.pipe(
            ofType(loadUsers),
            tap(data => console.log('effect tap', data)),
            mergeMap(
                () => this.userService.getUsers()
                        .pipe(
                            tap(data => console.log('get users effect', data)),
                            map(users => loadUsersSuccess({users})),
                            catchError(error => of(loadUsersError({payload: error})))
                        )
            )
        )
    );

}