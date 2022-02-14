import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { User } from './user.model';
import { AuthData } from './authData.model'
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { TrainingService } from '../training/training.service';
import { UIService } from 'src/app/seared/ui.service';
import { Store } from '@ngrx/store';
import * as StoreApp from '../../store/app.reducer';
import { StartLoading, StopLoading } from 'src/app/seared/ui.action';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authChange : Subject<boolean> = new Subject();
  private user : User ;

  constructor(
    private  router : Router, 
    private fireAuth: AngularFireAuth , 
    private trainingService : TrainingService,
    private uiService : UIService,
    private store : Store<StoreApp.State>)
    { }
  
  initAuthListener(){
    this.fireAuth.authState.subscribe(user =>{
      if (user) {
        this.authChange.next(true);
        this.router.navigate(['/training']);
      } else {
        this.trainingService.cancelSubscription();
        this.user = null;
        this.authChange.next(false);
        this.router.navigate(['/login']);
      }
    })
  }

  registerUser(authData:AuthData){
    this.store.dispatch(new StartLoading());
    this.fireAuth
      .createUserWithEmailAndPassword(authData.email , authData.password)
      .then(result =>{
        console.log(result);
        this.store.dispatch(new StopLoading());

      })
      .catch(err => 
        {
          this.store.dispatch(new StopLoading());
          this.uiService.showSnackBar(err.message , null , 6000);
        }
      );
  }

  
  loginUser(authData:AuthData){
    this.store.dispatch(new StartLoading());
    this.fireAuth
      .signInWithEmailAndPassword( authData.email , authData.password)
      .then(result =>{
        this.user = {
          email : result.user.email,
          userId : result.user.uid
        }
        console.log(result);
        this.store.dispatch(new StopLoading());
      })
      .catch(err => 
        {
          this.store.dispatch(new StopLoading()); 
          this.uiService.showSnackBar(err.message , null , 6000);
        }
      );
  }

  getUser() {
    return {...this.user};
  }

  logOutUser(){
    this.fireAuth.signOut();
  }

  isAuth(){
    return this.user != null;
  }

}
