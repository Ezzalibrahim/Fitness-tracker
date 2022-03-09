import { Action } from "@ngrx/store";
import { Exercise } from "src/app/services/training/exercise.model";


export const SET_AVAILABEL_TRAININGS = '[TRAINING] set available Exercises';
export const SET_FINISHED_TRAININGS = '[TRAINING] set finiched Exercises';
export const START_TRAINING = '[TRAINING] Start Exercise';
export const STOP_TRAINING = '[TRAINING] Stop Exercise';

export class SetAvailabelTrainings implements Action{
    readonly type = SET_AVAILABEL_TRAININGS;
    constructor(public payload : Exercise[]){}
}

export class SetFinishedTrainings implements Action{
    readonly type = SET_FINISHED_TRAININGS;
    constructor(public payload : Exercise[]){}
}

export class StartTraining implements Action{
    readonly type = START_TRAINING;
    constructor(public payload : string){}
}


export class StopTraining implements Action{
    readonly type = STOP_TRAINING;
}

export type TrainingActions = SetAvailabelTrainings | SetFinishedTrainings | StartTraining | StopTraining;