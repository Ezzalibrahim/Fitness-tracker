import { Component, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Exercise } from 'src/app/services/training/exercise.model';
import { TrainingService } from 'src/app/services/training/training.service';
import * as TrainingReducer from '../../../store/training/training.reducer';
import * as RootReducer from '../../../store/app.reducer'

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit{
  exercises$ : Observable<Exercise[]> ;
  isLoading$ : Observable<boolean> ;

  constructor(private trainingService : TrainingService , 
              private store : Store<TrainingReducer.State> ) 
    { }

  ngOnInit(): void {
    this.isLoading$ = this.store.select(RootReducer.getIsLoading);
    this.exercises$ = this.store.select(TrainingReducer.getAvailabelExercises)
    this.fetchExercises();
  }
  
  fetchExercises(){
    this.trainingService.fetchAvailabelExercises();
  }

  StartTrainig(form : NgForm){
    this.trainingService.startExercise(form.value.selectedExercise);
  }

}
