import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Subject, Subscription } from 'rxjs';
import { UIService } from 'src/app/seared/ui.service';
import { Exercise } from './exercise.model';


@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  exerciseChanged : Subject<Exercise> = new Subject<Exercise>();
  exercisesChanged : Subject<Exercise[]> = new Subject<Exercise[]>();
  finishedExercisesChanged : Subject<Exercise[]> = new Subject<Exercise[]>();
  exercisesSubscription : Subscription[] = [];

  availableExercises: Exercise[];
  private runningExercise : Exercise ;
  
  constructor(private db : AngularFirestore , 
              private  uiService : UIService) { }

  fetchAvailabelExercises(){
    this.uiService.isLoading.next(true);
    this.exercisesSubscription.push(this.db
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
      //throw new Error("ddddddddddd");
      
    })).subscribe({
      next : (data)=>{
        this.availableExercises = data;
        this.uiService.isLoading.next(false);
        this.exercisesChanged.next([...this.availableExercises]);
      } , 
      error : (err)=>{
        this.uiService.isLoading.next(false);
        this.exercisesChanged.next(null);
        this.uiService.showSnackBar('Problem in Fetch Exercises , Please Try Again', null , 6000);
      }}
    )
    );
  }

  startExercise(exerciseId : string){
    this.runningExercise = this.availableExercises.filter(exo => exo.id == exerciseId)[0];
    this.exerciseChanged.next(this.runningExercise);
  }

  completeExercise(){
    this.addDataToDataBase(
      {
        ...this.runningExercise ,
        date : new Date(),
        state:'completed'
      }
    );
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  stopExercise(progress : number){
    this.addDataToDataBase(
      { ...this.runningExercise ,
        duration : this.runningExercise!.duration * (progress / 100),
        calories : this.runningExercise!.calories * (progress / 100),
        date : new Date(),
        state:'cancelled'
      }
    );
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  fetchPastExercises(){
    this.exercisesSubscription.push(this.db.collection('finichedExercises')
      .valueChanges()
      .subscribe(
        {
          next :(exercises : Exercise[])=>
          {
            this.finishedExercisesChanged.next(exercises);
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

  getRunningExercise(){
    return {...this.runningExercise};
  }

  private addDataToDataBase(exercise : Exercise){
    this.db.collection('finichedExercises').add(exercise);
  }

}
