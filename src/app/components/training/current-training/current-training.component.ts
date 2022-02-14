import { Component, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Exercise } from 'src/app/services/training/exercise.model';
import { TrainingService } from 'src/app/services/training/training.service';
import { StopTrainingComponent } from './stop-training.component';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {
  selectedExercise : Exercise ;
  progress : number = 0;
  timer ;
  constructor(private dialog : MatDialog , private trainingService : TrainingService) { }

  ngOnInit(): void {
    this.selectedExercise = this.trainingService.getRunningExercise();
    this.stopOrResumeTimerProgress();
  }

  stopOrResumeTimerProgress(){
    this.timer = setInterval(()=>{
      this.progress += 1;
      if (this.progress >= 100) {
        this.trainingService.completeExercise();
        clearInterval(this.timer);
      }
    },this.selectedExercise.duration * 3)
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
        this.stopOrResumeTimerProgress();
      }
    });

  }


}

