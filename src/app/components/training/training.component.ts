import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TrainingService } from 'src/app/services/training/training.service';


@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit , OnDestroy{
  subscription : Subscription ;
  onGoingTraining: boolean = false;

  constructor(private trainingService : TrainingService) { }

  ngOnInit(): void {
    this.subscription = this.trainingService.exerciseChanged.subscribe(
      (exercise)=>{
        console.log(exercise);
        if (exercise) {
          this.onGoingTraining = true;
        } else {
          this.onGoingTraining = false;
        }
      })
  }

  startTraing(){
    this.onGoingTraining = true;
  }

  ngOnDestroy(): void {
      if(this.subscription){
        this.subscription.unsubscribe();
      }
  }

}
