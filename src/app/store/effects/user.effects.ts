import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of, pipe } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";
import { UserService } from "src/app/services/user.service";
import { loadUser, loadUserError, loadUserSuccess } from "../actions";


@Injectable()
export class UserEffects{

    constructor(
        private actions$: Actions,
        private userService: UserService
    ){}

    loadUser$ = createEffect(
        () => this.actions$.pipe(
                ofType(loadUser),
                mergeMap(
                    (action) => this.userService.getUser(action.id)
                    .pipe(
                        map(user => loadUserSuccess({user})),
                        catchError(error => of(loadUserError({payload: error})))
                    )
                )
            )            
        );


}