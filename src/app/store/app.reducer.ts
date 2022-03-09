import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as SharedUiReducer from '../shared/ui.reducer';
import * as AuthReducer from './auth/auth.reducer';

export interface State {
    ui : SharedUiReducer.State,
    auth : AuthReducer.State
}

export const reducers : ActionReducerMap<State> = {
    ui  : SharedUiReducer.appReducer,
    auth : AuthReducer.authReducer
};

//create selector for menage UI State
export const getUiState = createFeatureSelector<SharedUiReducer.State>('ui');
export const getIsLoading = createSelector(getUiState , SharedUiReducer.getIsLoading);

//create selector for menage Authentication State
export const getAuthState = createFeatureSelector<AuthReducer.State>('auth');
export const getIsAuth = createSelector(getAuthState , AuthReducer.getIsAuth);