import { Component, OnDestroy, OnInit} from '@angular/core';
import {  NgForm  } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { UIService } from 'src/app/seared/ui.service';
import { Exercise } from 'src/app/services/training/exercise.model';
import { TrainingService } from 'src/app/services/training/training.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit , OnDestroy{
  exercises : Exercise[] ;
  subscription : Subscription;
  selectedExercise : Exercise;
  isLoading : boolean = false;
  isLoadingSubscription : Subscription;

  constructor(private trainingService : TrainingService , 
              private uiService : UIService) 
    { 

    }

  ngOnInit(): void {
    this.isLoadingSubscription = this.uiService.isLoading.subscribe(isLoad => this.isLoading = isLoad);
    console.log('this.isLoading : ' , this.isLoading);
    this.subscription  = this.trainingService.exercisesChanged.subscribe((exercises)=>{
      this.exercises = exercises;
    });
    this.fetchExercises();
  }
  
  fetchExercises(){
    this.trainingService.fetchAvailabelExercises();
  }

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
    
    if(this.isLoadingSubscription){
      this.isLoadingSubscription.unsubscribe();
    }
  }



  StartTrainig(form : NgForm){
    this.trainingService.startExercise(form.value.selectedExercise);
  }

}
