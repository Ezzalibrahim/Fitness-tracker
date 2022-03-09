import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthData } from './authData.model'
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { TrainingService } from '../training/training.service';
import { UIService } from 'src/app/shared/ui.service';
import { Store } from '@ngrx/store';
import * as RootReducer from '../../store/app.reducer';
import * as AuthActions from '../../store/auth/auth.action';
import { StartLoading, StopLoading } from 'src/app/shared/ui.action';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private  router : Router, 
    private fireAuth: AngularFireAuth , 
    private trainingService : TrainingService,
    private uiService : UIService,
    private store : Store<RootReducer.State>)
    { }
  
  initAuthListener(){
    this.fireAuth.authState.subscribe(user =>{
      if (user) {
        this.store.dispatch(new AuthActions.UserAuthenticated())
        this.router.navigate(['/training']);
      } else {
        this.trainingService.cancelSubscription();
        this.store.dispatch(new AuthActions.UserUnAuthenticated());
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
        this.store.dispatch(new StopLoading());
      })
      .catch(err => 
        {
          this.store.dispatch(new StopLoading()); 
          this.uiService.showSnackBar(err.message , null , 6000);
        }
      );
  }


  logOutUser(){
    this.fireAuth.signOut();
    this.store.dispatch(new AuthActions.UserUnAuthenticated());
  }



}
