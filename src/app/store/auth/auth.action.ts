import { Action } from "@ngrx/store";


export const USER_AUTHENTICATED = '[AUTH] user Authenticated';
export const USER_UNAUTHENTICATED = '[AUTH] user UnAuthenticated';

export class UserAuthenticated implements Action{
    readonly type = USER_AUTHENTICATED;
}

export class UserUnAuthenticated implements Action{
    readonly type = USER_UNAUTHENTICATED;
}

export type AuthActions = UserUnAuthenticated | UserAuthenticated;