import { NgModule } from "@angular/core";

import { ReactiveFormsModule} from "@angular/forms";
import { StoreModule } from "@ngrx/store";
import { TrainingComponent } from '../components/training/training.component';
import { CurrentTrainingComponent } from '../components/training/current-training/current-training.component';
import { NewTrainingComponent } from '../components/training/new-training/new-training.component';
import { PastTrainingComponent } from '../components/training/past-training/past-training.component';
import { StopTrainingComponent } from "../components/training/current-training/stop-training.component";
import { SharedModule } from "./shared.module";
import { TrainingRoutingModule } from "../routes/training-routing.module";
import { trainingReducer } from "../store/training/training.reducer";

@NgModule({
    declarations : [
        CurrentTrainingComponent,
        NewTrainingComponent,
        PastTrainingComponent,
        TrainingComponent,
        StopTrainingComponent
    ],
    imports : [
        SharedModule,
        ReactiveFormsModule,
        TrainingRoutingModule,
        StoreModule.forFeature('training' , trainingReducer)
    ],
    entryComponents : [StopTrainingComponent],

})
export class TrainingModule{}