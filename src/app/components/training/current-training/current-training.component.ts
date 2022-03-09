import { Component, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Exercise } from 'src/app/services/training/exercise.model';
import { TrainingService } from 'src/app/services/training/training.service';
import { StopTrainingComponent } from './stop-training.component';
import * as TrainingState from '../../../store/training/training.reducer';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {
  selectedExercise : Exercise;
  progress : number = 0;
  timer ;
  constructor(private dialog : MatDialog ,
              private trainingService : TrainingService ,
              private store : Store<TrainingState.State>) { }

  ngOnInit(): void {
    this.startOrResumeTimerProgress();
  }

  startOrResumeTimerProgress(){
    this.store
      .select(TrainingState.getRuningExercise)
      .pipe(take(1))
      .subscribe(selectedExercise  => {
        this.selectedExercise = selectedExercise;
        const step = (selectedExercise.duration / 100) * 1000;

        console.log("Duration : ", selectedExercise.duration);
        this.timer = setInterval(()=>{
          this.progress += 1;
          if (this.progress >= 100) {
            this.trainingService.completeExercise();
            clearInterval(this.timer);
          }
        }, 100);
    });
  }  

  onStop(){
    clearInterval(this.timer);
    let dialogRef = this.dialog.open( StopTrainingComponent , {
      data:{
        progress : this.progress
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && this.progress < 100) {
        this.trainingService.stopExercise(this.progress);
      } else {
        this.startOrResumeTimerProgress();
      }
    });

  }


}

