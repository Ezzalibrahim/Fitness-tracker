import { createFeatureSelector , createSelector } from "@ngrx/store";
import { Exercise } from "src/app/services/training/exercise.model";
import { 
    TrainingActions ,
    SET_AVAILABEL_TRAININGS ,
    SET_FINISHED_TRAININGS ,
    START_TRAINING ,
    STOP_TRAINING
} from "./training.actions";
import *  as RootReducer from '../../store/app.reducer'


export interface TrainingState {
    availableExercises : Exercise[],
    finichedExercises : Exercise[],
    runingExercise : Exercise
}

export interface State extends RootReducer.State {
    training : TrainingState
}

const initialState : TrainingState = {
    availableExercises : [],
    finichedExercises : [],
    runingExercise : null
}


export function trainingReducer(state = initialState , action : TrainingActions){
    switch (action.type) {
        case SET_AVAILABEL_TRAININGS:
            return {
                ...state ,
                availableExercises : action.payload
            };
        case SET_FINISHED_TRAININGS:
            return {
                ...state ,
                finichedExercises : action.payload
           };
        case START_TRAINING:
           return {
                ...state ,
                runingExercise : state.availableExercises.filter(exo => exo.id == action.payload)[0]
          };
        case STOP_TRAINING:
          return {
                ...state ,
                runingExercise : null
         };
        default:
            return state;
    }
}

export const trainingState = createFeatureSelector<TrainingState>('training');

export const getAvailabelExercises  = createSelector(trainingState , ( state : TrainingState ) => state.availableExercises) ;
export const getFinishedExercises  = createSelector (trainingState,( state : TrainingState ) => state.finichedExercises) ;
export const getRuningExercise  = createSelector(trainingState,( state : TrainingState ) => state.runingExercise) ;
export const getIsTraining  = createSelector(trainingState,( state : TrainingState ) => state.runingExercise != null) ;