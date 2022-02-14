import { ActionReducerMap, createFeatureSelector, createReducer, createSelector } from '@ngrx/store';
import * as SearedUiReducer from '../seared/ui.reducer';

export interface State {
    ui : SearedUiReducer.State
}

export const reducers : ActionReducerMap<State> = {
    ui  : SearedUiReducer.appReducer
};

export const getUiState = createFeatureSelector<SearedUiReducer.State>('ui');
export const getIsLoading = createSelector(getUiState , SearedUiReducer.getIsLoading);
