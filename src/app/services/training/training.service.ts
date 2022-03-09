import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { take } from 'rxjs/operators';
import { map, Subscription } from 'rxjs';
import { UIService } from 'src/app/shared/ui.service';
import { Exercise } from './exercise.model';
import * as TrainingState from '../../store/training/training.reducer'
import { Store } from '@ngrx/store';
import { StartLoading, StopLoading } from 'src/app/shared/ui.action';
import * as Training  from 'src/app/store/training/training.actions';


@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  exercisesSubscription : Subscription[] = [];

  constructor(private db : AngularFirestore , 
              private  uiService : UIService ,
              private store : Store<TrainingState.State>) {}

  fetchAvailabelExercises(){
    this.store.dispatch(new StartLoading());
    this.exercisesSubscription
    .push(this.db
    .collection('availablesExercises')
    .snapshotChanges()
    .pipe(
     map(docData => {
      return docData.map( doc =>{
        return {
          id: doc.payload.doc['id'],
          name: doc.payload.doc.data()['name'],
          duration: doc.payload.doc.data()['duration'],
          calories: doc.payload.doc.data()['calories']
        };
      });
      //To simulate an Error
      //throw new Error("Problem in Fetch Exercises");
      
    })).subscribe({
      next : (data)=>{
        this.store.dispatch(new StopLoading());
        this.store.dispatch(new Training.SetAvailabelTrainings(data));
      } , 
      error : (err)=>{ 
        this.store.dispatch(new StopLoading()); 
        this.uiService.showSnackBar('Problem in Fetch Exercises , Please Try Again', null , 6000);
      }}
    )
    );
  }

  startExercise(exerciseId : string){
    this.store.dispatch(new Training.StartTraining(exerciseId));
  }

  async completeExercise(){
    this.store
        .select(TrainingState.getRuningExercise)
        .pipe(take(1))
        .subscribe( {
          next : runingExercise =>{
            this.addDataToDataBase({
              ...runingExercise,
              date : new Date(),
              state: 'completed'
            });
            this.store.dispatch(new Training.StopTraining());
        }
    });
    
  }

  stopExercise(progress : number){
    this.store
      .select(TrainingState.getRuningExercise)
      .pipe(take(1))
      .subscribe({
        next : runingExercise =>{
          this.addDataToDataBase({ 
            ...runingExercise,
              duration : runingExercise.duration * (progress / 100),
              calories : runingExercise.calories * (progress / 100),
              date : new Date(),
              state:'cancelled'
          });
        this.store.dispatch(new Training.StopTraining());
      }
    });
  }

  fetchPastExercises(){
    this.exercisesSubscription
      .push(this.db.collection('finichedExercises')
      .valueChanges()
      .subscribe(
        {
          next :(exercises : Exercise[]) =>
          {
            this.store.dispatch(new Training.SetFinishedTrainings(exercises));
          },
          error : (err)=>{
            this.uiService.showSnackBar('Problem in Fetch Exercises , Please Try Again', null , 6000);
          }
        }
      )
    );
  }

  cancelSubscription(){
    this.exercisesSubscription.forEach((sub)=>{
      if(sub){
        sub.unsubscribe();
      }
    })
  }


  private addDataToDataBase(exercise){
    this.db.collection(`finichedExercises`).add({...exercise});
  }

}
