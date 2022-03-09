import { AuthActions  , USER_AUTHENTICATED , USER_UNAUTHENTICATED} from "./auth.action";

export interface State {
    isAuthenticated : boolean
}

const initialState : State = {
    isAuthenticated : false
}


export function authReducer(state = initialState , action : AuthActions){
    switch (action.type) {
        case USER_AUTHENTICATED:
            return {
                isAuthenticated : true
            };
        case USER_UNAUTHENTICATED:
            return {
                isAuthenticated : false
           };
        default:
            return state;
    }
}


export const getIsAuth  = ( state : State )=> state.isAuthenticated ;